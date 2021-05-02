const express = require('express');
const transactionRouter = express.Router();
const controller = require('../services/transactionService');

// transactionRouter.use(controller.checkPeriod);
transactionRouter.get('/',controller.getTransctions);
transactionRouter.post('/',controller.newTransction);
transactionRouter.patch('/:id',controller.editTransction);
transactionRouter.delete('/:id',controller.removeTransction);

module.exports = transactionRouter;
