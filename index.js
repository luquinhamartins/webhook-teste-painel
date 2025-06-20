const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Gerar usuário numérico (ex: 6 dígitos)
function gerarUsername() {
  return String(Math.floor(Math.random() * 900000 + 100000));
}

// Gerar senha numérica (ex: 6 dígitos)
function gerarSenha() {
  return String(Math.floor(Math.random() * 900000 + 100000));
}

app.post('/api/chatbot/teste_automatico', async (req, res) => {
  const SECRET = 'd579fee83c19767d4f22b2a9c4e7bbb8';
  const TOKEN = 'PANELCLIENT_9X9G2-A12FD-85O3X-0VTHV';
  const BOUQUET_IDS = [1, 2, 3, 4];

  const username = gerarUsername();
  const password = gerarSenha();

  const PAINEL_URL = `https://clienteiptv.com/pagamento?user=${username}`;

  try {
    const response = await axios.post(`https://api.painelcliente.com/trial_create/${TOKEN}`, {
      secret: SECRET,
      username,
      password,
      idbouquet: BOUQUET_IDS,
      notes: 'Teste gerado automaticamente via webhook'
    });

    if (response.data.result) {
      return res.json({
        usuario_CenterGO: response.data.data.username,
        senha_CenterGO: response.data.data.password,
        pagamento_CenterGO: PAINEL_URL
      });
    } else {
      return res.status(400).json({ erro: response.data.mens });
    }
  } catch (error) {
    console.error('Erro ao criar teste:', error.message);
    return res.status(500).json({ erro: 'Erro ao comunicar com a API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
