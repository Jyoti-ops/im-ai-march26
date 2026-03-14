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

## Features

- **Projects** – Create projects and add tasks to them
- **Timer** – Start/stop timer for a project and optional task; elapsed time updates live
- **Entries** – List all time entries and see today’s total

Data is stored in `data/tracker.db` (SQLite). The file is created on first run and is gitignored.
