(function () {
  var tasksData = [];
  var taskSelect = document.getElementById('task_id');
  var projectSelect = document.getElementById('project_id');
  var elapsedEl = document.getElementById('elapsed');

  if (typeof TASKS !== 'undefined') {
    tasksData = TASKS;
  }

  function fillTasks(projectId) {
    if (!taskSelect) return;
    taskSelect.innerHTML = '<option value="">— None —</option>';
    var id = projectId ? parseInt(projectId, 10) : 0;
    tasksData.filter(function (t) { return t.project_id === id; }).forEach(function (t) {
      var opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.name;
      taskSelect.appendChild(opt);
    });
  }

  if (projectSelect) {
    projectSelect.addEventListener('change', function () {
      fillTasks(projectSelect.value);
    });
    fillTasks(projectSelect.value);
  }

  var elapsedBlock = document.querySelector('.elapsed[data-started]');
  if (elapsedBlock && elapsedEl) {
    var started = elapsedBlock.getAttribute('data-started');
    function tick() {
      var start = new Date(started).getTime();
      var sec = Math.floor((Date.now() - start) / 1000);
      var m = Math.floor(sec / 60);
      var s = sec % 60;
      elapsedEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    }
    tick();
    setInterval(tick, 1000);
  }
})();
