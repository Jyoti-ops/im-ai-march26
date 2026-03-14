const express = require('express');
const db = require('../db');

const router = express.Router();

function getNoProjectId() {
  const row = db.prepare("SELECT id FROM projects WHERE name = 'No Project'").get();
  return row ? row.id : null;
}

function getProjectsWithDefaultFirst() {
  const noProject = db.prepare("SELECT * FROM projects WHERE name = 'No Project'").get();
  const rest = db.prepare("SELECT * FROM projects WHERE name != 'No Project' ORDER BY name").all();
  return noProject ? [noProject, ...rest] : rest;
}

router.get('/', (req, res) => {
  const projects = getProjectsWithDefaultFirst();
  res.render('projects', { title: 'Projects', projects, noProjectId: getNoProjectId() });
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

router.post('/tasks', (req, res) => {
  let projectId = parseInt(req.body.project_id, 10);
  if (!projectId) projectId = getNoProjectId();
  const name = (req.body.task_name || '').trim();
  if (name && projectId) {
    db.prepare('INSERT INTO tasks (project_id, name) VALUES (?, ?)').run(projectId, name);
  }
  res.redirect('/projects');
});

module.exports = router;
