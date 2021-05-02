const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const getTransctions = async (req, res) => {
  const { period, description } = req.query;
  const regexPeriod = /\d{4}-\d{2}/;

  try {
    if (!period || !regexPeriod.test(period)) {
      res.status(400).send({
        error:
          'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
      });
    }

    var condition = { yearMonth: period };
    condition = description
      ? {
          ...condition,
          description: { $regex: new RegExp(description), $options: "i" },
        }
      : { ...condition };

    const transactions = await TransactionModel.find(condition);
    res.send({ length: transactions.length, transactions });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const newTransction = async (req, res) => {
  const transaction = req.body;

  try {
    const newTransaction = new TransactionModel(transaction);
    await newTransaction.save();
    res.status(201).send({ message: "Transação inserida com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const editTransction = async (req, res) => {
  const { id } = req.params;
  const transaction = req.body;

  try {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      id,
      transaction,
      { new: true }
    );
    if (!updatedTransaction) {
      res.status(404).send({ error: "Transação não encontrada" });
    } else {
      res.send({ message: "Transação alterada com sucesso!" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const removeTransction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
    if (!deletedTransaction) {
      res.status(404).send({ error: "Transação não encontrada" });
    } else {
      res.send({ message: "Transação removida com sucesso!" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getTransctions,
  newTransction,
  editTransction,
  removeTransction,
};
