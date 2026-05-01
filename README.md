# YES or NO?

A mobile-friendly voting app that presents 100 thought-provoking dilemmas answered strictly with YES or NO.

## How to Run

### Option A — Basic (open directly)
Open `index.html` in any browser. All features work except the PWA / Service Worker (which requires HTTP).

### Option B — Full PWA (recommended for mobile demo)
Serve the folder over a local HTTP server so the Service Worker can register:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# VS Code
Install the "Live Server" extension, then right-click index.html → Open with Live Server
```

Then open `http://localhost:8000` in your mobile browser. On Android you'll see an "Add to Home Screen" prompt.

---

## Mobile Web Technologies

| Technology | What it does in this app |
|---|---|
| **Web App Manifest** (`manifest.json`) | Defines the app name, icon, theme color, and `display: standalone` so it launches without browser chrome |
| **Service Worker** (`sw.js`) | Pre-caches all assets on install — app works fully offline after first load |
| **Vibration API** | `navigator.vibrate()` — single pulse on YES, double pulse on NO, short tick on Skip |
| **Touch Events API** | `touchstart / touchmove / touchend` — drag the question card left (NO) or right (YES) to vote; card tilts and reveals a label during the drag; snaps back if not swiped far enough |

---

## File Structure

```
272MobileDev/
├── index.html      — app structure (three screens)
├── style.css       — dark theme, mobile-first styles
├── app.js          — 100 questions and all app logic
├── manifest.json   — PWA web app manifest
├── sw.js           — Service Worker (offline caching)
├── icon.svg        — app icon (home screen + splash)
└── README.md       — this file
```

## How It Works

1. **Start** — tap "Start Voting" to begin (or resume where you left off)
2. **Vote** — swipe the card right for YES, left for NO — or tap the buttons
3. **Results** — view all answers grouped by YES / NO / Skipped; reset anytime

Votes are saved to `localStorage` and persist across browser sessions.

## Browser Support

Chrome, Firefox, Safari, Edge. PWA install prompt available on Chrome/Android.
