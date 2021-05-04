import React from "react";
import styles from "../components/styles.module.css";
import Action from "./Actions";

const formatter = Intl.NumberFormat("pt-BR", {style: 'currency', currency : 'BRL', minimumFractionDigits:2});

const Transaction = ({ transaction, onActionClick }) => {
  const { description, value, category, day, type } = transaction;
  return (
    <>
      <div className={styles.transaction} style={type === "-" ? {backgroundColor: "lightpink"} : {backgroundColor: "lightgreen"}}>
          <div style={{ width: 50, fontSize: 24}}>{day.toString().padStart(2, "0")}</div>
          <div style={{ width: 600 }}>
            <span style={{fontWeight:700}}>{category}</span><br/>
            <span>{description}</span>
          </div>
          <div style={{ width: 150, fontWeight : 700, fontSize : 20 }}>{formatter.format(value)}</div>
          <div>
            <Action transaction={transaction} type={'edit'} onActionClick={onActionClick}/>
            <Action transaction={transaction} type={'delete'} onActionClick={onActionClick}/>
          </div>
      </div>
    </>
  );
};

export default Transaction;
