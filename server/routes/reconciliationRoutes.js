const express = require('express');
const router = express.Router();
const reconCtrl = require('../controllers/reconciliationController');

router.post('/run', reconCtrl.runReconciliation);

module.exports = router;
