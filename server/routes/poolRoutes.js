const express = require('express');
const router = express.Router();
const poolCtrl = require('../controllers/poolController');

router.get('/', poolCtrl.getAllPools);
router.post('/', poolCtrl.createPool);
router.post('/:id/sweep', poolCtrl.triggerSweep);

module.exports = router;
