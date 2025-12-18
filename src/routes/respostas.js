const express = require('express');
const router = express.Router();
const controller = require('../controllers/respostasController');

router.post('/', controller.create);

module.exports = router;

