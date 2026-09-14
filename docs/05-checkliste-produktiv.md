# Checkliste: Bereit für den Produktivbetrieb

Solange nur du und Testdaten in der App sind, ist sie ein Prototyp. Sobald **echte Personen sie nutzen** oder **echte personenbezogene Daten** drin sind, ist sie produktiv. Dann muss diese Liste abgearbeitet sein. Geh sie mit der Ansprechperson durch.

## Technik

- [ ] CI ist grün auf `main`.
- [ ] Dependabot-PRs sind gemergt oder bewusst zurückgestellt.
- [ ] Datenbank-Backups sind in Coolify aktiviert und mindestens einmal erfolgreich gelaufen.
- [ ] Health-Check antwortet grün.
- [ ] Domain und HTTPS funktionieren.
- [ ] Ein Wiederherstellungstest wurde gemacht: Backup in eine frische Datenbank eingespielt, App läuft.

## Login

- [ ] `AUTH_MODE=authentik` ist aktiv, Basic Auth und `APP_PASSWORD` sind entfernt.
- [ ] Wer welche Funktion sehen darf, ist im Code umgesetzt, nicht nur in der Navigation versteckt.

## Datenschutz

- [ ] **Steckbrief im README** ausgefüllt: Zweck, Nutzerkreis, Datenkategorien, Speicherdauer, Ansprechperson.
- [ ] **Impressum** unter `/impressum` vollständig.
- [ ] **Datenschutzerklärung** unter `/datenschutz` beschreibt genau diese App und ist mit dem Datenschutzbeauftragten abgestimmt.
- [ ] Keine externen Dienste, oder für jeden ein Auftragsverarbeitungsvertrag.
- [ ] Löschkonzept: es ist klar, wann Daten gelöscht werden, und es gibt einen Weg, das zu tun.
- [ ] Keine personenbezogenen Daten in Logs.
- [ ] Bei besonderen Datenkategorien (Gesundheit, Religion, Mitgliedschaft): vorher mit dem Datenschutzbeauftragten sprechen, ob eine Datenschutz-Folgenabschätzung nötig ist.

## Barrierefreiheit

- [ ] Alles ist per Tastatur bedienbar (Tab durch die ganze App).
- [ ] Jedes Formularfeld hat ein sichtbares Label.
- [ ] Bilder haben sinnvolle Alt-Texte.
- [ ] Kontrast reicht aus (Text auf Hintergrund mindestens 4,5:1).
- [ ] Fehlermeldungen sind als Text sichtbar, nicht nur als rote Farbe.

## Betrieb

- [ ] Es gibt eine zweite Person, die die App kennt und im Notfall eingreifen kann.
- [ ] Der Nutzerkreis weiß, wen er bei Problemen anspricht.
- [ ] Der Status im README-Steckbrief steht auf "Produktiv seit …".
