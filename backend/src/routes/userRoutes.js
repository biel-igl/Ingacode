const express = require('express');

const userDB = require('../db/userDB');
const router = express.Router();

router.post('/', async (req, res) => {
    const user = req.body;
    try {
      const [result] = await userDB.insert(user);
      res.status(201).json({
        message: `Usuario cadastradao com sucesso com o id ${result.insertId}` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Ocorreu um erro ao cadastrar um usuario' });
    }
  });

module.exports = router;