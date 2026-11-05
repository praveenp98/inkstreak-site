# Inkstreak Web (inkstreak.app/write)

A free writing tracker that brings people to the Inkstreak app. It runs entirely in the browser: no server, no accounts. Notes and word counts are saved in the visitor's browser (localStorage).

## What it does
- **Write:** notes with a live word count. Only typed words count; pasted text doesn't (people log that instead).
- **Log words:** add words written in other apps or on paper.
- **Daily goal** (default 1,667) and **streak** with one forgiving rest day a week, same rule as the app.
- **Challenge:** November 50k or any 30-day challenge. Day X of 30, words needed per day, projected finish date, calendar.
- **Sprints:** 15 or 25 minutes, with words written in the sprint.
- **Focus mode:** full-screen page. Esc exits.
- **Share card:** Post (1080×1350) or Story (1080×1920) PNG with words, streak, challenge and 7-day bars.
- **Backup:** download or copy a JSON backup, load it on another device, export notes as text.
- **Get the app:** iPhone launch sign-up and Android beta sign-up (Gmail).
- Installs to the phone home screen and works offline.

## Put it live (GitHub Pages, same repo as the website)
1. Unzip. In your `inkstreak-site` repo on GitHub, click **Add file › Upload files**.
2. Drag in the whole **`write`** folder (the folder itself, so the files land in `write/`). Click **Commit changes**.
3. Wait a minute, then open **https://inkstreak.app/write/**.
4. Add a button on the home page linking to `/write/` (for example "Track your November words free").

## Sign-up forms
Sign-ups are emailed to support@inkstreak.app through FormSubmit (free, no account). The `list` field says `ios-launch` or `android-beta`.
1. support@inkstreak.app must forward to your Gmail (ImprovMX MX records at GoDaddy).
2. The first sign-up sends FormSubmit's activation email to support@inkstreak.app. Click **Activate** once. Until then, the form shows people the support email instead.
To use Formspree instead, paste its endpoint into `FORM_ENDPOINT` in `index.html`.

## When the iPhone app is live
In the same `CONFIG` block, paste the App Store link into `APP_STORE_URL: ""`. The iPhone card switches to an App Store button.

## Updating the page
After any change to `index.html`, also open `sw.js` and change the `VERSION` line (any new text). That makes phones that installed it fetch the new version.

## Backup format (for the iOS and Android apps to export later)
Any app that writes this JSON can be loaded with **Load a backup**:

```json
{
  "format": "inkstreak-backup",
  "version": 1,
  "source": "ios",
  "exportedAt": "2026-11-05T14:00:00Z",
  "days": { "2026-11-05": { "typed": 1240, "logged": 0 } },
  "notes": [
    { "id": "UUID", "title": "Chapter 3", "body": "…", "tag": "Novel",
      "createdAt": 1762300000000, "updatedAt": 1762350000000, "deleted": false }
  ],
  "logs": []
}
```
- `days` may also be an array of `{ "day": "2026-11-05", "words": 1240 }` (the iOS `DayTally` shape). `words` is read as `typed`.
- Notes merge by `id`; the newer `updatedAt` wins. Day counts merge by taking the larger number, so loading the same backup twice never doubles anything.
- Dates in `createdAt`/`updatedAt` can be milliseconds or ISO strings.

Live two-way sync (notes appear on the web automatically) needs a small backend later, for example Supabase or Cloudflare D1. This format is designed so that can be added without changing the data.
