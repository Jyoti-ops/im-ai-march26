# Training Batch Time Tracker

Local web app to track time for projects and tasks. Uses Node.js, Express, SQLite, and EJS.

## Run locally

```bash
# One-time: install dependencies
npm install

# Start the app (with auto-restart on file changes)
npm run dev
```

Then open **http://localhost:3000** in your browser.

## Commands

- `npm run dev` – run with nodemon (recommended for development)
- `npm start` – run with node (production)
- `npm test` – run the test suite (unit + integration)

## Features

- **Projects** – Create projects and add tasks to them
- **Timer** – Start/stop timer for a project and optional task; elapsed time updates live
- **Entries** – List all time entries and see today’s total

Data is stored in `data/tracker.db` (SQLite). The file is created on first run and is gitignored.

##npm test result in powershell

PS C:\Users\imart\im-ai-march26\training-batch-time-tracker> npm test   

> training-batch-time-tracker@1.0.0 test
> node --test tests/unit/time.test.js tests/integration/timer.test.js

▶ POST /timer/start
  ✔ creates a time entry and redirects to /timer (31.8097ms)
  ✔ shows the new entry on the entries page (47.7957ms)
✔ POST /timer/start (80.6346ms)
▶ time.getDurationSeconds
  ✔ returns seconds between two Date objects (0.7921ms) 
  ✔ returns seconds between ISO strings (0.1396ms)      
  ✔ rounds fractional seconds (0.2029ms)
  ✔ returns 0 when start equals end (0.1337ms)
✔ time.getDurationSeconds (2.2135ms)
▶ time.formatDuration
  ✔ formats zero as 0h 0m (0.1879ms)
  ✔ formats minutes only (0.0895ms)
  ✔ formats hours and minutes (0.1614ms)
✔ time.formatDuration (1.5448ms)
▶ time.shouldKeepEntry
  ✔ returns false for duration under 60 seconds (0.2327ms)
  ✔ returns true for duration >= 60 seconds (0.1409ms)  
✔ time.shouldKeepEntry (0.6607ms)
▶ time.MIN_DURATION_SECONDS
  ✔ is 60 (0.1247ms)
✔ time.MIN_DURATION_SECONDS (0.1802ms)
ℹ tests 12
ℹ suites 5
ℹ pass 12
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 438.3398
