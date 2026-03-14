const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Home – Training Batch Time Tracker' });
});

router.use('/projects', require('./projects'));
router.use('/timer', require('./timer'));
router.use('/entries', require('./entries'));

module.exports = router;
