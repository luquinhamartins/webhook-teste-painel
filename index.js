const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Gerar usuário (4 letras fáceis + 4 números)
function gerarUsername() {
  const letras = 'acdefhjkmnprstuvwxyz';
  let resultado = '';

  // 4 letras
  for (let i = 0; i < 4; i++) {
    resultado += letras.charAt(Math.floor(Math.random() * letras.length));
  }

  // 4 números
  for (let i = 0; i < 4; i++) {
    resultado += Math.floor(Math.random() * 10);
  }

  return resultado;
}

// Gerar senha numérica (8 dígitos)
function gerarSenha() {
  let resultado = '';

  for (let i = 0; i < 8; i++) {
    resultado += Math.floor(Math.random() * 10);
  }

  return resultado;
}

app.post('/api/chatbot/teste_automatico', async (req, res) => {
  const SECRET = 'e24c57edd79e66c0e27975e740cf8289';
  const TOKEN = 'PANELCLIENT_9X9G2-A12FD-85O3X-0VTHV';
  const BOUQUET_IDS = [1, 2, 3, 4];

  const username = gerarUsername();
  const password = gerarSenha();

  const PAINEL_URL = `https://clienteiptv.com/pagamento?user=${username}`;

  try {
    const response = await axios.post(
      `https://api.painelcliente.com/trial_create/${TOKEN}`,
      {
        secret: SECRET,
        username,
        password,
        idbouquet: BOUQUET_IDS,
        notes: 'Teste gerado automaticamente via webhook'
      }
    );

    if (response.data.result) {
      return res.json({
        usuario_CenterGO: response.data.data.username,
        senha_CenterGO: response.data.data.password,
        pagamento_CenterGO: PAINEL_URL
      });
    } else {
      return res.status(400).json({
        erro: response.data.mens
      });
    }
  } catch (error) {
    console.error('Erro ao criar teste:', error.message);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Resposta:', error.response.data);
    }

    return res.status(500).json({
      erro: 'Erro ao comunicar com a API'
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
