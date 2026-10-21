# MemoryZoo – Kontext für einen neuen Chat

> Ich entwickle das Kinder-Memory **MemoryZoo**. Bitte lies diesen Projektstand und arbeite auf dem vorhandenen Repository weiter. Kommuniziere auf Deutsch, verständlich und knapp. Führe gewünschte Änderungen direkt aus und prüfe sie. Frage nur nach, wenn eine wichtige Entscheidung offen ist.

## Ziel und Geräte

Ein einfaches Memory-Spiel für Kinder, die noch nicht lesen können. Der Schwerpunkt liegt auf Gestaltung, Animationen und Tierlauten. Auf dem iPhone wird die Webversion verwendet. Ich habe keinen Mac mit Xcode. Zusätzlich gibt es eine Android-Test-APK.

## Repository und Links

- Repository: https://github.com/andreherren-gmail/memory
- Verwendeter Remote-Branch: `main` (lokaler Arbeitsbranch zuletzt `work`).
- Bisheriger Cloud-Pfad: `/workspace/memory` – in einer neuen Umgebung zuerst den tatsächlichen Checkout prüfen.
- Vorgesehene Webadresse: https://andreherren-gmail.github.io/memory/ — Pages-Erreichbarkeit in der neuen Sitzung prüfen, nicht als garantiert veröffentlicht behandeln.
- Android-Test-APK: https://github.com/andreherren-gmail/memory/raw/refs/heads/main/downloads/MemoryZoo-test.apk
- Aktuelle Spielvorschau: https://github.com/andreherren-gmail/memory/blob/main/assets/prototype-iphone.png
- Intro-Vorschau: https://github.com/andreherren-gmail/memory/blob/main/assets/intro-iphone.png
- Bestätigter Kartenentwurf: https://github.com/andreherren-gmail/memory/blob/main/assets/kartenentwurf.png

Lokale Bildlinks und Chat-Bildvorschauen wurden bei mir mehrfach nicht angezeigt. Bilder deshalb auch auf GitHub bereitstellen und mit einem GitHub-Link zeigen.

## Bestätigte Gestaltung

- Die gesamte iPhone-Fläche ist das Spielbrett. Keine Website mit Titelbereich, Erklärung oder Fußzeile darum herum.
- Keine sichtbaren Lesetexte im eigentlichen Spiel: kein „Wer gehört zusammen?“, keine Hinweise wie „Probier es nochmal“, keine Tiernamen auf Karten. Zugänglichkeitsbeschriftungen bleiben erhalten.
- Kräftige, fröhliche Farben: leuchtendes Orange als Rahmen, Sonnengelb als Spielfläche, sattes Blau als untere Auswahlleiste. Frühere blasse Pastellfarben waren zu eintönig.
- Eigenständige Kinderspiel-Gestaltung mit Karton- und Bilderbuchcharakter. Keine austauschbare KI-Vorlagenoptik. Nicht einfach zusätzliche Dekoration, Verläufe oder runde Flächen hinzufügen.
- Die Tierkarten wurden ausdrücklich als gut bestätigt: einheitliche Tierillustrationen statt Emojis, cremefarbene Karton-Vorderseiten, blaue Rückseiten mit gelben und cremefarbenen Pfoten.
- Oben: deutliche blaue Neustart-Taste mit weißem Kreispfeil links; gelbe Pfote auf blauer Lasche mittig; Lautsprecher-Symbol rechts.
- Das Logo ist eine feste SVG-Pfote und soll auf Desktop und iPhone identisch aussehen. Die frühere Blume wurde ersetzt.
- Unten: drei Kartenstapel-Icons für 6, 12 und 20 Karten, aktive Auswahl gelb. Keine ausgeschriebenen Levels und keine winzigen Kartenraster.
- Kein sichtbarer Fortschrittsbalken. Die Karten sollen im Hoch- und Querformat ohne Scrollen passen.
- Kurze Kartenwendung, zurückhaltende Paaranimation und Konfetti zum Sieg. Reduzierte Bewegung berücksichtigen.

## Spiel und Audio

- Zehn Tiere: Katze, Hund, Kuh, Ente, Schwein, Schaf, Pferd, Küken, Löwe und Frosch.
- Bei einem gefundenen Paar ertönt der passende Tierlaut. Ton muss abschaltbar sein.
- Die derzeitigen Laute sind synthetische Annäherungen über Web Audio, noch keine echten Tieraufnahmen. Nicht als authentische Aufnahmen beschreiben.
- Nach einem gemeldeten iPhone-Tonproblem wurde die Aktivierung überarbeitet: Audio beim Tippen freigeben, `navigator.audioSession.type = 'playback'` soweit unterstützt, Master-Gain fürs Stummschalten, kein Suspend beim Neustart, Testton beim Einschalten.
- Der Nutzer bestätigte danach mit „wunderbar“.
- Beim Start erscheint für ungefähr 2,8 Sekunden ein Tier-Intro mit dem Namen MemoryZoo. Ein großer Spielknopf überspringt es sofort und aktiviert Audio durch die Berührung. Reduzierte Bewegung verkürzt das Intro. Es erscheint nicht bei jedem Levelwechsel oder Neustart erneut.

## Technischer Stand

Version: `0.2.0`. Letzter Funktionscommit vor dieser Kontextdatei: `c0e105e`.

Die Webversion ist bewusst schlicht: HTML, CSS und JavaScript ohne Framework oder Build-Abhängigkeiten.

- `index.html`: Oberfläche, Intro, Siegdialog.
- `style.css`: Spielbrett, responsive Darstellung, Animationen und Intro. Enthält mehrere aufeinander aufbauende Design-Overrides; bei weiterer Pflege gegebenenfalls sorgfältig konsolidieren, ohne Layoutregressionen.
- `app.js`: Spielzustand, Kartenerzeugung, Web-Audio, Intro.
- `assets/animals.png`: generierter Illustrationsatlas, fünf Spalten und zwei Zeilen. Oben Katze/Hund/Kuh/Ente/Schwein; unten Schaf/Pferd/Küken/Löwe/Frosch.
- `assets/card-back.svg`: blaue Rückseite mit Pfotenmuster.
- `assets/logo.svg`: gelbe Pfote.
- `android/`: native Android-WebView-Hülle, Manifest, Theme und App-Symbol.
- `scripts/build-apk.sh`: APK-Bau ohne Gradle.
- `downloads/MemoryZoo-test.apk`: veröffentlichte signierte Android-Testdatei, ungefähr 2,8 MB.
- `downloads/SHA256SUMS`: Prüfsumme der APK; nach jedem aktualisierten APK-Build neu erzeugen.
- `README.md`: Start-, Installations- und Build-Hinweise.

## Lokal starten und prüfen

```sh
cd /workspace/memory
npm start
npm run check
```

`npm start` startet Python HTTP-Server auf Port 3000. Wenn dieser belegt ist, einen anderen Port verwenden. Eine Cloud-localhost-Adresse ist vom iPhone aus nicht erreichbar.

`npm run check` prüft nur JavaScript-Syntax. Für Funktionsvalidierung zusätzlich Browserprüfungen verwenden. In der bisherigen Umgebung waren Playwright und `/usr/bin/chromium` vorhanden. Temporäre Prüfskripte unter `/tmp` sind nicht Bestandteil des Repositorys und müssen in einer neuen Umgebung gegebenenfalls neu erstellt werden.

Bisher geprüft: Spielablauf, passende und unpassende Paare, Sieg, Neustart, drei Kartenzahlen auf vier Handyformaten einschließlich Querformat, Audioausgabe im Browser, Stumm-/Lautschalten und Intro/Überspringen. Das ersetzt keine echten iPhone- oder Android-Gerätetests.

## Android-APK

Die App heißt auch im Android-Launcher MemoryZoo, Paketname `de.memoryzoo.app`. Android 8.0/API 26 oder neuer; Target API 35. Aktuelles Android System WebView empfohlen.

Die WebView lädt ausschließlich mitgelieferte Dateien über eine intern abgefangene HTTPS-Adresse. Keine Internetberechtigung, keine Anmeldung, keine Werbung oder Tracking. Die APK funktioniert mit ihren Bildern und synthetischen Sounds offline. Das ist noch keine Play-Store-Veröffentlichung.

```sh
./scripts/build-apk.sh
```

Ergebnis: `dist/MemoryZoo-test.apk`. Das Script prüft auch die APK-Signatur. Es benötigt Java mit dem Modul `jdk.compiler`, Android Platform 35 und Build Tools 35.0.0. Pfade lassen sich mit `MEMORYZOO_BUILD_TOOLS`, `MEMORYZOO_ANDROID_JAR` und `MEMORYZOO_SIGNING_DIR` setzen.

Bisherige Werkzeugpfade außerhalb des Repositorys:

- `/workspace/android-tools/build-tools/android-15`
- `/workspace/android-tools/platform/android-35/android.jar`

Diese Werkzeuge sind in einer neuen Umgebung nicht garantiert vorhanden. Downloads nur aus vertrauenswürdigen Quellen beziehen und Prüfsummen/Signaturen kontrollieren.

Die APK ist mit einem lokalen Entwicklungsschlüssel signiert. Der bisherige Schlüssel liegt außerhalb des Repositorys in `/workspace/.memoryzoo-signing/debug.keystore`. Nicht ins Repository einchecken oder im Chat offenlegen. Für kompatible Updates denselben Schlüssel behalten. Ein neuer Schlüssel kann eine Deinstallation der bisherigen Testversion erforderlich machen. Für Store-Veröffentlichung eine eigene Release-Signierung vorbereiten.

Nach einem Webcode-Update die APK neu bauen, nach `downloads/MemoryZoo-test.apk` kopieren und die Prüfsumme aktualisieren, wenn auch die Android-Version aktualisiert werden soll. Die veröffentlichte APK aktualisiert sich nicht automatisch mit der Website.

APK-Bau, Signatur, Manifest und enthaltene Dateien wurden geprüft; ein echter Android-Laufzeittest ist noch offen.

## Zusammenarbeit und nächster Schritt

Der Nutzer möchte kleine, sichtbare Iterationen, die sich über GitHub beurteilen lassen. Es wurde bereits ausdrücklich erlaubt, die App auf GitHub hochzuladen; bisherige Änderungen wurden nach Prüfung nach `main` gepusht. Vor neuen Änderungen den tatsächlichen Repositoryzustand und aktuelle Anweisungen prüfen und vorhandene Arbeit erhalten.

Es ist derzeit keine weitere Designänderung beschlossen. Zuerst auf den nächsten Wunsch eingehen oder ein konkretes Testergebnis der Android-Testversion aufgreifen. Fertige Änderungen, Browserprüfungen und auf echten Geräten noch ungeprüftes Verhalten klar unterscheiden.
