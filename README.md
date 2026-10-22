# MemoryZoo

Kinder-Memory mit illustrierten Tierkarten, einem kurzen überspringbaren Tier-Intro und synthetischen Tierlauten bei gefundenen Paaren. Ohne Werbung, Anmeldung, Tracking oder sichtbare Lesetexte im Spiel. Das Intro zeigt den Namen MemoryZoo.

## Premium-Ausrichtung (Arbeitsstand)

Die geplanten verbindlichen Qualitätskriterien zu Werbefreiheit, Trackingfreiheit, Eltern-Zeitbox, sanfter Gestaltung, echten Tierlauten und Namensstrategie stehen in [PREMIUM_KRITERIEN.md](PREMIUM_KRITERIEN.md). **Diese Punkte sind noch nicht alle umgesetzt.** Die Namen MemoryZoo, SafeMemory und „Safe Games for Kids“ sind für den weltweiten Verkauf noch nicht markenrechtlich freigegeben.

## Android-Testversion

[MemoryZoo-test.apk herunterladen](downloads/MemoryZoo-test.apk) · Android 8.0 oder neuer, aktuelles Android System WebView empfohlen.

Die APK auf einem Android-Gerät herunterladen, öffnen und bei Bedarf für den verwendeten Browser die Installation aus dieser Quelle zulassen. Die Version ist mit einem lokalen Entwicklungsschlüssel signiert, für direktes Testen gedacht und noch nicht für den Play Store veröffentlicht. Die Android-Laufzeit muss noch auf einem echten Gerät geprüft werden. Bilder, Intro und synthetische Sounds sind vollständig enthalten; die App hat keine Internetberechtigung.

## Webversion

```sh
cd /workspace/memory
npm start
```

Ein einfacher HTTP-Server startet auf Port 3000. Auf dem iPhone die veröffentlichte HTTPS-Webseite in Safari öffnen; eine APK läuft nur auf Android.

## Android selbst bauen

Benötigt werden Java mit dem Modul `jdk.compiler`, Android Platform 35 (`android.jar`) und Android Build Tools 35.0.0. Das Script nutzt `java com.sun.tools.javac.Main`, AAPT2, D8, zipalign und apksigner. Kein Gradle und keine externen Java-Bibliotheken erforderlich.

```sh
./scripts/build-apk.sh
```

Ergebnis: `dist/MemoryZoo-test.apk`. Alternative Pfade lassen sich mit `MEMORYZOO_BUILD_TOOLS`, `MEMORYZOO_ANDROID_JAR` und `MEMORYZOO_SIGNING_DIR` setzen. Die Standardpfade stehen im Script. Der Entwicklungsschlüssel wird außerhalb des Repositorys unter `/workspace/.memoryzoo-signing/` erzeugt und muss für kompatible Updates aufbewahrt werden; er gehört nicht ins Repository. Für eine Store-Veröffentlichung ist eine gesonderte Release-Signierung nötig.

Die Android-Hülle lädt ausschließlich mitgelieferte Dateien über eine lokale HTTPS-WebView-Adresse. Externe Navigation, Dateizugriff und unverschlüsselte Requests sind deaktiviert. Audio pausiert beim Verlassen der App und wird beim nächsten Kartentipp wieder aktiviert.

## Prüfung und Gestaltung

```sh
npm run check
```

Der Spielablauf, Intro/Überspringen, Audioausgabe und die Darstellung in vier Handyformaten wurden in Chromium geprüft. APK-Inhalt, Manifest und Signatur sind validiert. Diese Prüfungen ersetzen keinen Test auf einem echten Android-Gerät.

Die Tierillustrationen liegen als generierter Bildatlas in `assets/animals.png`; Logo und Kartenrückseite sind SVG-Dateien. Die Sounds sind synthetische Annäherungen an Tierlaute, keine echten Aufnahmen. Reduzierte Bewegung, Tastaturbedienung und zugängliche Kartenbeschriftungen werden berücksichtigt.
