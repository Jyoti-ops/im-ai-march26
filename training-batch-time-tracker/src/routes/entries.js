const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT e.*, p.name AS project_name, t.name AS task_name
    FROM time_entries e
    LEFT JOIN projects p ON e.project_id = p.id
    LEFT JOIN tasks t ON e.task_id = t.id
    ORDER BY e.started_at DESC
  `).all();
  const todayResult = db.prepare(`
    SELECT COALESCE(SUM(duration_seconds), 0) AS total
    FROM time_entries
    WHERE date(started_at) = date('now', 'localtime')
  `).get();
  const todayTotalSeconds = todayResult ? todayResult.total : 0;
  res.render('entries', {
    title: 'Entries',
    entries: rows,
    todayTotalSeconds: Number(todayTotalSeconds),
  });
});

module.exports = router;
