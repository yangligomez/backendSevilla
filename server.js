require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://sevillau.netlify.app']
}));

app.use(express.json());

const BASE = `${process.env.SUPABASE_URL}/rest/v1/items`;

/* GET */
app.get('/api/items', async (req, res) => {
  const r = await fetch(BASE, {
    headers: {
      apikey: process.env.SUPABASE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_KEY}`
    }
  });
  const data = await r.json();
  res.json(data);
});

/* POST */
app.post('/api/items', async (req, res) => {
  const r = await fetch(BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
      Prefer: 'return=representation'
    },
    body: JSON.stringify(req.body)
  });
  const data = await r.json();
  res.json(data[0]);
});

/* DELETE */
app.delete('/api/items/:id', async (req, res) => {
  await fetch(`${BASE}?id=eq.${req.params.id}`, {
    method: 'DELETE',
    headers: {
      apikey: process.env.SUPABASE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_KEY}`
    }
  });
  res.json({ ok: true });
});

/* TEST */
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.listen(process.env.PORT, () => {
  console.log('Server running');
});