const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY name').all();
  res.render('projects', { title: 'Projects', projects });
});

router.post('/', (req, res) => {
  const name = (req.body.name || '').trim();
  if (name) {
    db.prepare('INSERT INTO projects (name) VALUES (?)').run(name);
  }
  res.redirect('/projects');
});

router.get('/:id/tasks', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  if (!project) return res.redirect('/projects');
  const tasks = db.prepare('SELECT * FROM tasks WHERE project_id = ? ORDER BY name').all(id);
  res.render('tasks', { title: `Tasks – ${project.name}`, project, tasks });
});

router.post('/:id/tasks', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const name = (req.body.name || '').trim();
  if (name) {
    db.prepare('INSERT INTO tasks (project_id, name) VALUES (?, ?)').run(projectId, name);
  }
  res.redirect(`/projects/${projectId}/tasks`);
});

module.exports = router;
