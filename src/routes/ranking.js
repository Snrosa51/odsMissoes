const express = require('express');
const router = express.Router();
const controller = require('../controllers/rankingController');

router.get('/', controller.getRanking);

module.exports = router;
