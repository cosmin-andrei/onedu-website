// routes/mobilpayRoutes.js

const express = require('express');
const router = express.Router();
const mobilpayController = require('../controllers/mobilpayController');

// Definirea rutei pentru webhook Mobilpay
router.post('/webhook', mobilpayController.handleWebhook);

// Exportarea router-ului
module.exports = router;
