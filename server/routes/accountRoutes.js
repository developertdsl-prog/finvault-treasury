const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/accountController');

router.get('/', accountCtrl.getAllAccounts);
router.post('/', accountCtrl.createAccount);
router.get('/:id', accountCtrl.getAccountById);

module.exports = router;
