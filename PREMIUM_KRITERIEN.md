# MemoryZoo – Premium-Leitlinien (Arbeitsstand)

Stand: 22. Oktober 2026. Dieses Dokument definiert die beabsichtigte Produktqualität und Positionierung, **nicht** den Status bereits implementierter Funktionen. Bestehende bestätigte Kartengestaltung und Spielmechanik bleiben erhalten, bis eine Änderung gesondert beschlossen ist.

## Ziel und Versprechen

Ein hochwertiges, ruhiges Tier-Paarsuchspiel für noch nicht lesende Kinder (vorwiegend 2–5 Jahre): **Einmal kaufen, ohne Werbung, ohne Tracking, ohne Abo und ohne In-App-Käufe.** International vermarktbar, offline nutzbar, ohne Texte im Kinderspiel.

### Verbindliche Qualitätskriterien / Abnahmetests

| Kriterium | Umsetzungsvorgabe | Abnahme |
| --- | --- | --- |
| Keine Werbung | Keine Werbe-SDKs, Banner, Pop-ups, Produktplatzierungen oder werbliche Links im Kinderbereich. | Quellcode und Laufzeit-Netzwerkverkehr geprüft. |
| Kein App-Tracking | Keine Analytics-/Tracking-/Identifikations-SDKs, keine Nutzerprofile, keine persistenten Nutzerkennungen, keine eingebundenen Drittinhalte. | Datenschutz- und Netzwerkprüfung für Web, iOS und Android; Datenschutzerklärung unterscheidet App von Store- bzw. Hosting-Verarbeitung. |
| Keine Kaufanreize | Einmaliger Kaufpreis; keine Abos, In-App-Käufe, Cross-Promotions oder externen Links im Kinderbereich. | Spiel komplett durchspielbar, keine Verkaufselemente im Kindermodus. |
| Eltern-Zeitbox | Vorgeschlagener Standard: 10 Minuten aktive Spielzeit; Elternoptionen 5/10/15/20 Minuten oder aus. Einstellungen nur hinter geeigneter Elternsperre. | Restzeit lokal gespeichert, bleibt nach Neustart bestehen; bei App im Hintergrund keine Spielzeit verbraucht; freundlicher Abschluss statt abruptem Abbruch. Keine vom Kind leicht auslösbare Verlängerung. |
| Sanfte Spielgestaltung | Bestehenden Karton-/Bilderbuchstil und die bestätigten Tierkarten bewahren; Orange/Gelb/Blau gezielt weniger grell abstimmen, keine blassen Pastellflächen als Ersatz. Keine hektischen Blitze. | Visuelle Tests auf iPhone- und Android-Formaten; wichtige UI-Elemente ausreichend kontrastreich, Status nie nur über Farbe. |
| Hochwertiger Ton | Zehn echte, kommerziell lizenzierte Tieraufnahmen statt synthetischer Annäherungen. Lokal in der App enthalten, sauber geschnitten, ohne störende Hintergrundgeräusche, hörbar ausgeglichene Lautheit, keine überraschend lauten Spitzen. | Jede Tierart gehört zur richtigen Karte; Pegel- und Hörtest; funktioniert auf echten iOS-/Android-Geräten auch offline. Stummtaste zuverlässig. |
| Kindgerechter Ablauf | Große Tippflächen, 6/12/20 Karten, kein Lesetext, keine Fehlerbestrafung, keine Streaks, Leaderboards oder Endlos-Belohnungsschleifen. | Kinder können ohne Lesen spielen, alle Ausgänge inklusive Zeitende sind verständlich. |
| Barrierefreiheit | Zugänglichkeitsbeschriftungen, reduzierte Bewegung, klare Bedienelemente. Als Prüfzielen: ≥3:1 Kontrast für wesentliche grafische Bedienelemente, ≥4,5:1 für normalen Text im Elternbereich. | Accessibility-/Kontrasttests, Bildschirmlesertests und Tests mit reduzierter Bewegung. |
| Offline | Illustration und Audio nach Installation ohne Internet verfügbar. Die Webfassung braucht ein eigenes geprüftes Offline-Konzept. | Tests ohne Netzwerk, nach Neustart und bei Bildschirmwechsel. |
| Kinderdatenschutz | Elternbereich für rechtliche Angaben, keine Dateneingabe durch Kinder, Store-Richtlinien und Gesetze der Zielregionen vor Veröffentlichung prüfen. | Audit der App-Pakete, Datenschutzhinweise und Store-Deklarationen. |

**Grenze der Zeitbox:** Die App kann sich selbst begrenzen, aber keine systemweite Bildschirmzeit oder absolute Manipulationssicherheit garantieren. Betriebssystemseitige Elternkontrollen bleiben ergänzend sinnvoll.

**Grenze der Audioversprechen:** Wir können Clips technisch begrenzen und angleichen; die tatsächliche Hörlautstärke hängt auch von Gerät, Kopfhörer und Systemlautstärke ab. Keine unbelegte Behauptung wie „garantiert gehörsicher“.

## Namen und Markenarchitektur – noch nicht freigegeben

- **„Safe Games for Kids“**: Kandidat für Qualitätsversprechen / beschreibenden Claim und ggf. eine übergeordnete Produktlinie. Die Formulierung ist generisch und wird andernorts bereits beschreibend verwendet; **keine geprüfte, exklusive Marke**.
- **„MemoryZoo“**: Bestehender Arbeitstitel der App. Nicht ohne Markenprüfung als endgültiger weltweiter Verkaufstitel festlegen.
- **„SafeMemory“**: Namensvorschlag. Kommuniziert das Sicherheitsmotiv, ist für ein Tier-Kinderspiel jedoch weniger emotional und wegen „Memory“ ebenfalls vor Nutzung zu prüfen.
- **Wichtiger Prüfpunkt:** Ravensburger nutzt „memory®“ als Marke für das Paarsuchspiel. Vor kostenpflichtigem Release eine qualifizierte Markenrecherche (u. a. CH/EU/WIPO und wichtige Zielmärkte), App-Store-Suche und Domain-Prüfung durchführen; ohne Freigabe keine Markenrechte behaupten.
- Ein eigener, unterscheidbarer Produktname plus der Claim „Safe Games for Kids“ kann stärker sein als ein rein beschreibender Produktname.

## Aktueller Implementierungsstand laut Quellcode / Projektkontext

- Vorhanden: Spielbrett, 10 illustriert dargestellte Tiere, drei Kartenzahlen, Animationen, Stummschaltung, kurzer Introbildschirm, Web- und Android-Prototyp ohne Werbe-/Tracking-Integration im sichtbaren Spielcode.
- Noch offen: Eltern-Zeitbox, echte/lizenzierte Tieraufnahmen, kontrollierte Premium-Farbabstimmung, internationaler Markenentscheid, systematische Privacy-/Store- und Echtgeld-Release-Tests.
- Noch offen für den Verkaufsstart: Offline-Test auf iPhone, echte Gerätetests, Lizenznachweise aller Assets, verifizierte App-Store-Freigaben, Datenschutzdokumentation, Veröffentlichung einer gesonderten Verkaufsfassung.

## Reihenfolge

1. Qualitätskriterien und Markenstrategie bestätigen; Namen rechtlich vorprüfen.
2. Eltern-Zeitbox plus Elternbereich entwerfen und funktional prüfen.
3. Lizenzierte Tierlaute integrieren und auf echten Geräten abhören.
4. Farben/Animationen behutsam abstimmen, ohne den bestätigten Kartenstil zu verlieren.
5. Vollständige Kinder-/Eltern-Tests sowie Android-/iPhone-Vertriebsfreigabe.

Dieses Dokument ändert keine Spielfunktionen und beansprucht keine rechtliche Markenfreigabe.
