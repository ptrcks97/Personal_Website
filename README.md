# PS-OS · Patrick Schöpfer

Persönliche Website im Stil eines Retro-CRT-Monitoring-Dashboards. Angular 22, zoneless, Signals.

## Entwicklung

```bash
npm install
npm start          # http://localhost:4200
npm run build      # Ausgabe: dist/patrick-os/browser
```

## Docker

```bash
docker compose up -d --build     # http://localhost:8080
docker compose down
```

Oder ohne Compose:

```bash
docker build -t patrick-os .
docker run -d -p 8080:8080 --name patrick-os patrick-os
```

Mehrstufiger Build: Node 24 baut die App, ausgeliefert wird sie von einem nginx ohne Root-Rechte
(Port 8080, Healthcheck unter `/healthz`). Die Konfiguration steht in [`nginx.conf`](nginx.conf).
Nach Änderungen an Inhalten oder Bildern einfach neu bauen.

## Inhalte anpassen

Alle Texte (DE/EN), Skills, Werdegang und Projekte stehen in
[`src/app/data/profile.ts`](src/app/data/profile.ts).

| Was | Wie |
| --- | --- |
| **Lebenslauf** | PDF als `public/cv/Lebenslauf_Patrick_Schoepfer.pdf` ablegen, dann in `profile.ts` `cv.available: true` setzen. |
| **Tell-Experience-Bilder** | Bilder z. B. als `public/projects/tell/app.jpg` und `public/projects/tell/artikel.jpg` ablegen, dann bei `media` die `src: null` durch `'projects/tell/app.jpg'` bzw. `'projects/tell/artikel.jpg'` ersetzen. |
| **Foto** | `public/img/patrick.jpg` |
| **Impressum** | Adresse unter `legal` in `profile.ts` (`street: null` blendet die Strasse aus). Erreichbar über den Footer, den Konsolenbefehl `impressum` oder direkt per `/#impressum`. |

## Bedienung & Easter Eggs

- Tasten `1`–`6` springen zu den Abschnitten
- Konsole: `help`, `ls -a`, `cat .secret`, `sudo hire patrick`, `woof`, …
- Irgendwo auf der Seite **`unix`** tippen → *“It's a UNIX system! I know this!”*
- Boot-Sequenz läuft einmal pro Browser-Session; erneut mit `reboot`
- CRT-Effekte lassen sich oben rechts abschalten; `prefers-reduced-motion` wird respektiert
