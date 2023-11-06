const app = require('./app');
const connection = require('./db/connection');

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`API ingacode está sendo executada na porta ${PORT}`);
  console.log(`Valor da variável de ambiente $USER: ${process.env.USER}`);
});