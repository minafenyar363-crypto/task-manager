const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'taskdb',
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, done) VALUES ($1, $2, false) RETURNING *',
      [title, description || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET done = $1 WHERE id = $2 RETURNING *',
      [done, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = app;