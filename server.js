require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.post('/login', async (req, res) => {
  console.log('➡️  POST recebido no /login');
  const { email, senha } = req.body;

  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('email', email)
    .eq('senha', senha)
    .single();

  if (error || !data) {
    return res.send('Email ou senha incorretos.');
  }

  res.send('Login realizado com sucesso!');
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});
