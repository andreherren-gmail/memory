#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
PROJECT_ROOT="$PWD"
TOOLS="${MEMORYZOO_BUILD_TOOLS:-/workspace/android-tools/build-tools/android-15}"
PLATFORM="${MEMORYZOO_ANDROID_JAR:-/workspace/android-tools/platform/android-35/android.jar}"
SIGNING_DIR="${MEMORYZOO_SIGNING_DIR:-/workspace/.memoryzoo-signing}"
BUILD="$PROJECT_ROOT/dist/android"
for binary in aapt2 d8 zipalign apksigner; do test -x "$TOOLS/$binary" || { echo "Missing Android build tool: $TOOLS/$binary" >&2; exit 1; }; done
test -f "$PLATFORM"
mkdir -p "$BUILD/res" "$BUILD/classes" "$BUILD/dex" "$BUILD/assets/assets" "$SIGNING_DIR"
cp index.html app.js style.css "$BUILD/assets/"
cp assets/animals.png assets/card-back.svg assets/logo.svg "$BUILD/assets/assets/"
"$TOOLS/aapt2" compile --dir android/res -o "$BUILD/resources.zip"
"$TOOLS/aapt2" link -o "$BUILD/base.apk" -I "$PLATFORM" --manifest android/AndroidManifest.xml -A "$BUILD/assets" "$BUILD/resources.zip"
java com.sun.tools.javac.Main -source 8 -target 8 -bootclasspath "$PLATFORM" -cp "$PLATFORM" -d "$BUILD/classes" android/src/de/memoryzoo/app/MainActivity.java
mapfile -t JAVA_CLASSES < <(find "$BUILD/classes" -name '*.class' -print)
"$TOOLS/d8" --lib "$PLATFORM" --min-api 26 --output "$BUILD/dex" "${JAVA_CLASSES[@]}"
python3 - "$BUILD" <<'PY'
import sys, zipfile, pathlib
root=pathlib.Path(sys.argv[1])
with zipfile.ZipFile(root/'base.apk','a',zipfile.ZIP_DEFLATED) as apk:
 for dex in (root/'dex').glob('*.dex'):apk.write(dex,dex.name)
PY
"$TOOLS/zipalign" -f 4 "$BUILD/base.apk" "$BUILD/aligned.apk"
# Local development certificate only. Keep it for compatible updates; never commit it.
if [ ! -f "$SIGNING_DIR/debug.keystore" ]; then
 keytool -genkeypair -keystore "$SIGNING_DIR/debug.keystore" -storepass android -keypass android -alias androiddebugkey -dname 'CN=Android Debug,O=MemoryZoo,C=CH' -keyalg RSA -keysize 2048 -validity 10000 >/dev/null 2>&1
fi
"$TOOLS/apksigner" sign --ks "$SIGNING_DIR/debug.keystore" --ks-key-alias androiddebugkey --ks-pass pass:android --key-pass pass:android --out "$PROJECT_ROOT/dist/MemoryZoo-test.apk" "$BUILD/aligned.apk"
"$TOOLS/apksigner" verify --verbose "$PROJECT_ROOT/dist/MemoryZoo-test.apk"
"$TOOLS/aapt2" dump badging "$PROJECT_ROOT/dist/MemoryZoo-test.apk"
