import React from "react";
import styles from "../components/styles.module.css";

const formatter = Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 });

const Summary = ({ transactions }) => {
  let total = 0,
    credit = 0,
    debit = 0,
    balance = 0;

  const calculate = () => {
    if (transactions) {
      total = transactions.length;
      credit = transactions
        .filter((t) => t.type === "+")
        .reduce((acc, cur) => acc + cur.value, 0);
      debit = transactions
        .filter((t) => t.type === "-")
        .reduce((acc, cur) => acc + cur.value, 0);
      balance = credit - debit;
    }
  };

  calculate();

  return (
    <div className="container">
      <div className={styles.summary}>
        <span>Lançamentos: {total}</span>
        <span>
          Receitas: <span className={styles.positive}>{formatter.format(credit)}</span>
        </span>
        <span>
          Despesas: <span className={styles.negative}>{formatter.format(debit)}</span>
        </span>
        <span>
          Saldo:{" "}
          <span className={balance < 0 ? styles.negative : styles.positive}>
            {formatter.format(balance)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Summary;
