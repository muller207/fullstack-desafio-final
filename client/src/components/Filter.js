import React from "react";
import styles from "../components/styles.module.css";

const Filter = ({onChangeFilter, onActionClick}) => {
  const onChange = (event) => {
    if(onChangeFilter)
      onChangeFilter(event.target.value);
  };

  const handleClick = () => {
    if(onActionClick) 
      onActionClick({}, 'add');
  }

  return (
    <div className="container">
      <div className={styles.flexcol}>
        <a onClick={handleClick} href="/#" className="btn blue">
          <i className="material-icons">add</i>
        </a>
        <div>&nbsp;&nbsp;</div>
        <input placeholder="Descrição" type="text" onChange={onChange}  />
      </div>
    </div>
  );
};

export default Filter;
