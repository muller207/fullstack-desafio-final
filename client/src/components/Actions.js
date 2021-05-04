import React from "react";
import styles from "../components/styles.module.css";

const Action = ({transaction, type, onActionClick}) => {
  const handleActionClick = () => {
    if(onActionClick) 
      onActionClick(transaction, type);
  }

  return <i onClick={handleActionClick} className={`material-icons ${styles.cursor}`}>{type}</i>;
};

export default Action;
