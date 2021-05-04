import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Selector from "./components/Selector";
import Summary from "./components/Summary";
import Filter from "./components/Filter";
import List from "./components/List";
import transactionService from "./services/transactionService";
import ModalTransaction from "./components/ModalTransaction";

const MIN_YEAR = 2019;
const MAX_YEAR = 2021;

const App = () => {
  const [period, setPeriod] = useState("2019-01");
  const [description, setDescription] = useState();
  const [transactions, setTransations] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("");

  const getTransactions = async () => {
    const { data } = await transactionService.getTransactions(
      period,
      description
    );
    const orderedData = data.transactions.sort((a, b) => a.day - b.day);
    setTransations(orderedData);
  };

  const removeTransaction = async (transaction) => {
    await transactionService.removeTransaction(transaction);
    getTransactions();
  };

  const updateTransaction = async (transaction) => {
    await transactionService.updateTransaction(transaction);
    getTransactions();
  };

  const newTransaction = async (transaction) => {
    await transactionService.newTransaction(transaction);
    getTransactions();
  };

  useEffect(() => {
    const getTransactions = async () => {
      const { data } = await transactionService.getTransactions(
        period,
        description
      );
      const orderedData = data.transactions.sort((a, b) => a.day - b.day);
      setTransations(orderedData);
    };

    try {
      getTransactions();
    } catch (error) {
      console.log(error);
    }
  }, [period, description]);

  const handleActionClick = (transaction, type) => {
    if (type === "delete") {
      removeTransaction(transaction);
      return;
    }
    setMode(type);
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleModalPersist = (transaction, type) => {
    if (type === "edit") {
      updateTransaction(transaction);
      setModalOpen(false);
      return;
    }
    newTransaction(transaction);
    setModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <Selector
        initialYear={MIN_YEAR}
        finalYear={MAX_YEAR}
        onChangePeriod={setPeriod}
      />
      <Summary transactions={transactions} />
      <Filter onChangeFilter={setDescription} onActionClick={handleActionClick} />
      <List transactions={transactions} onActionClick={handleActionClick} />
      {modalOpen && (
        <ModalTransaction
          selectedTransaction={selectedTransaction}
          mode={mode}
          onSave={handleModalPersist}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default App;
