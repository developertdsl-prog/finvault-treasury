const express = require('express');
const router = express.Router();
const fxCtrl = require('../controllers/fxController');

router.get('/exposure', fxCtrl.getFxExposure);
router.get('/contracts', fxCtrl.listHedgeContracts);
router.post('/contracts', fxCtrl.createHedgeContract);

module.exports = router;
