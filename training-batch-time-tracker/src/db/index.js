const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../data/tracker.db');
const db = new Database(dbPath);

const schema = `
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS time_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  task_id INTEGER REFERENCES tasks(id),
  started_at TEXT NOT NULL,
  ended_at TEXT,
  duration_seconds INTEGER
);

CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_project_started ON time_entries(project_id, started_at);
CREATE INDEX IF NOT EXISTS idx_time_entries_started_at ON time_entries(started_at);
`;

db.exec(schema);

const noProject = db.prepare("SELECT id FROM projects WHERE name = 'No Project'").get();
if (!noProject) {
  db.prepare("INSERT INTO projects (name) VALUES (?)").run('No Project');
}

module.exports = db;
