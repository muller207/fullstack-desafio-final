import React from "react";
import Transaction from "./Transaction";

const List = ({ transactions, onActionClick }) => {
  const showTransactions = () => {
    return transactions.map(t => {
      return <Transaction key={t._id} transaction={t} onActionClick={onActionClick} />
    })
  };

  return (
    <div className="container">
      {showTransactions()}
    </div>
  );
};

export default List;
