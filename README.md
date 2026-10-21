# Tierfreunde – Memory-Prototyp

Responsiver Design-Prototyp für iPhone und Desktop, ohne Build oder externe JavaScript-Abhängigkeiten.

## Starten

```sh
cd /workspace/memory
npm start
```

Der lokale Entwicklungsserver läuft auf Port 3000. Zum Testen auf einem iPhone muss die Seite über einen vom iPhone erreichbaren HTTPS-Host bereitgestellt werden; ein Cloud-localhost ist auf dem iPhone nicht erreichbar.

## Funktionen

- 6, 12 oder 20 Karten mit zufälligen Tierpaaren
- Kartenwendung, Paaranimation, Fortschritt und Siegesdialog
- Tierlaute über Web Audio, erst nach Interaktion; Ton abschaltbar
- Die Laute sind für den Prototyp synthetisch nachempfunden. Für die finale Fassung sind echte, lizenzierte Tieraufnahmen vorgesehen.
- Reduzierte Bewegung berücksichtigt, Tastaturbedienung und Kartenbeschriftungen

Die optionalen Google Fonts benötigen Internet; Systemschriften dienen als Fallback. Emojis werden je nach Gerät unterschiedlich dargestellt. Kein Offline-Service-Worker und keine App-Store-Veröffentlichung in diesem Prototyp.

## Prüfen

```sh
npm run check
```
