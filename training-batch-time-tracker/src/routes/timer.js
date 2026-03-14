const express = require('express');
const db = require('../db');

const router = express.Router({ mergeParams: true });

function getProjectsWithDefaultFirst(db) {
  const noProject = db.prepare("SELECT * FROM projects WHERE name = 'No Project'").get();
  const rest = db.prepare("SELECT * FROM projects WHERE name != 'No Project' ORDER BY name").all();
  return noProject ? [noProject, ...rest] : rest;
}

function getNoProjectId(db) {
  const row = db.prepare("SELECT id FROM projects WHERE name = 'No Project'").get();
  return row ? row.id : null;
}

router.get('/', (req, res) => {
  const projects = getProjectsWithDefaultFirst(db);
  const tasks = db.prepare('SELECT id, project_id, name FROM tasks ORDER BY project_id, name').all();
  const current = db.prepare(
    'SELECT e.*, p.name AS project_name, t.name AS task_name FROM time_entries e LEFT JOIN projects p ON e.project_id = p.id LEFT JOIN tasks t ON e.task_id = t.id WHERE e.ended_at IS NULL LIMIT 1'
  ).get();
  res.render('timer', { title: 'Timer', projects, tasks, current });
});

function stopCurrentEntry(db) {
  const row = db.prepare('SELECT * FROM time_entries WHERE ended_at IS NULL LIMIT 1').get();
  if (!row) return;
  const endedAt = new Date().toISOString();
  const duration_seconds = Math.round((new Date(endedAt) - new Date(row.started_at)) / 1000);
  if (duration_seconds >= 60) {
    db.prepare('UPDATE time_entries SET ended_at = ?, duration_seconds = ? WHERE id = ?').run(endedAt, duration_seconds, row.id);
  } else {
    db.prepare('DELETE FROM time_entries WHERE id = ?').run(row.id);
  }
}

router.post('/start', (req, res) => {
  stopCurrentEntry(db);
  let projectId = parseInt(req.body.project_id, 10);
  if (!projectId) projectId = getNoProjectId(db);
  const taskId = req.body.task_id ? parseInt(req.body.task_id, 10) : null;
  const startedAt = new Date().toISOString();
  db.prepare('INSERT INTO time_entries (project_id, task_id, started_at) VALUES (?, ?, ?)').run(projectId, taskId, startedAt);
  res.redirect('/timer');
});

router.post('/stop', (req, res) => {
  const row = db.prepare('SELECT * FROM time_entries WHERE ended_at IS NULL LIMIT 1').get();
  if (row) {
    const endedAt = new Date().toISOString();
    const duration_seconds = Math.round((new Date(endedAt) - new Date(row.started_at)) / 1000);
    if (duration_seconds >= 60) {
      db.prepare('UPDATE time_entries SET ended_at = ?, duration_seconds = ? WHERE id = ?').run(endedAt, duration_seconds, row.id);
    } else {
      db.prepare('DELETE FROM time_entries WHERE id = ?').run(row.id);
    }
  }
  res.redirect('/timer');
});

module.exports = router;
