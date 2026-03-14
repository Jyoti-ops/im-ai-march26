# Training Batch Time Tracker

A local web app to track time for projects and tasks. Built with Node.js, Express, SQLite, and EJS. Data stays on your machine in a single SQLite file.

## Overview

Training Batch Time Tracker lets you define projects and tasks, run a start/stop timer against them, and view a list of time entries with a today’s total. It’s designed to run locally (e.g. in VS Code) with no external services. One terminal command starts the server; open the app in your browser.

## Features

- **Projects** – Create projects and add tasks to each.
- **Tasks** – Add tasks from the Projects page (default project: “No Project”) or from inside a project.
- **Timer** – Start the timer for a project and optional task; stop when done. Elapsed time updates live while running.
- **Switch task** – Start a new timer while one is running; the current entry is stopped automatically and the new one starts. Entries under 1 minute are not saved.
- **Entries** – View all time entries (project, task, started, ended, duration) and see **today’s total** at the top.
- **Storage** – SQLite database at `data/tracker.db` (created on first run, gitignored).

## Prerequisites

- **Node.js** 18 or later (for the built-in test runner). [nodejs.org](https://nodejs.org/)
- **npm** (included with Node.js)

Check versions:

```bash
node -v   # e.g. v18.x or v20.x
npm -v
```

## Setup

1. **Go to the project folder** (must contain `package.json`):

   ```bash
   cd path/to/training-batch-time-tracker
   ```

2. **Install dependencies** (one-time):

   ```bash
   npm install
   ```

3. **Optional:** Use a different port or database path:

   - `PORT=4000` – run the server on port 4000 (default: 3000).
   - `DATABASE_PATH=./data/mydb.db` – use a different SQLite file (default: `data/tracker.db`). Tests use `DATABASE_PATH=:memory:`.

## Run commands

| Command        | Description |
|----------------|-------------|
| `npm run dev`  | Start the app with auto-restart on file changes (recommended for development). |
| `npm start`    | Start the app with Node (no auto-restart). |
| `npm test`     | Run the test suite (unit tests for time calculations + integration test for creating a time entry). |

After starting the app, open **http://localhost:3000** in your browser.

## Troubleshooting

**“Cannot find package.json” / “ENOENT: no such file or directory, open '...package.json'”**

- You’re not in the app folder. Run `cd training-batch-time-tracker` (or your actual project path) so the current directory contains `package.json`, then run `npm install` or `npm run dev` again.

**“Port 3000 is already in use”**

- Another process is using port 3000. Either stop that process or set a different port, e.g. `set PORT=4000` (Windows CMD) or `$env:PORT=4000` (PowerShell), then `npm run dev`.

**Database is locked / “SQLITE_BUSY”**

- Only one process should use the same SQLite file. Close any other running instance of the app, or run the second instance with a different `DATABASE_PATH`.

**Tests fail with “Cannot find module” or “MODULE_NOT_FOUND”**

- Run `npm install` from the project root. If you added new test files, ensure the `npm test` script in `package.json` lists them (e.g. `node --test tests/unit/time.test.js tests/integration/timer.test.js`).

**Changes to code or views don’t appear**

- If using `npm run dev`, nodemon should restart on save. If not, stop the server (Ctrl+C) and run `npm run dev` again. If using `npm start`, restart the server manually after changes.
