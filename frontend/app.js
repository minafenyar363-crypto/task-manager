// كل الطلبات رايحة على /api/... ونginx هو اللي هيحولها للـ backend (reverse proxy)
const API_URL = '/api/tasks';

const form = document.getElementById('task-form');
const list = document.getElementById('task-list');

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  list.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const span = document.createElement('span');
    span.className = 'title';
    span.textContent = task.title;
    span.onclick = () => toggleDone(task.id, !task.done);

    const actions = document.createElement('div');
    actions.className = 'actions';
    const delBtn = document.createElement('button');
    delBtn.textContent = 'مسح';
    delBtn.onclick = () => deleteTask(task.id);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

async function toggleDone(id, done) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done }),
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadTasks();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  form.reset();
  loadTasks();
});

loadTasks();
