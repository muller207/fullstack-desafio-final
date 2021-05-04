import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "../components/styles.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ModalTransaction = ({ selectedTransaction, onSave, onClose, mode }) => {
  const [description, setDescription] = useState(
    mode === "edit" ? selectedTransaction.description : ""
  );
  const [category, setCategory] = useState(
    mode === "edit" ? selectedTransaction.category : ""
  );
  const [value, setValue] = useState(
    mode === "edit" ? selectedTransaction.value : 0
  );
  const [date, setDate] = useState(
    mode === "edit" ? selectedTransaction.yearMonthDay : ""
  );
  const [type, setType] = useState(
    mode === "edit" ? selectedTransaction.type : "-"
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") onClose();
  };

  const handleSave = () => {
    const dt = new Date(date);
    let transaction = {
      description,
      category,
      value,
      type,
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      day: dt.getDay(),
      yearMonth: date.substring(0, 7),
      yearMonthDay: date,
    };
    if(mode==='edit') transaction = {...transaction, _id: selectedTransaction._id};
    onSave(transaction, mode);
  };

  return (
    <Modal isOpen={true} style={customStyles}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5 style={{ fontWeight: 700 }}>
          {mode === "edit" ? "Edição" : "Inclusão"} de Lançamento
        </h5>
        <a href="/#" onClick={onClose} className="btn red">
          <i className="material-icons">clear</i>
        </a>
      </div>
      <div className={styles.modalContent}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: 20,
          }}
        >
          <label>
            <input
              onChange={(e) => setType(e.target.value)}
              className="with-gap"
              name="type"
              type="radio"
              value="-"
              disabled={mode==="edit"}
              checked={type === "-"}
            />
            <span>Despesa</span>
          </label>
          <label>
            <input
              onChange={(e) => setType(e.target.value)}
              className="with-gap"
              name="type"
              type="radio"
              value="+"
              disabled={mode==="edit"}
              checked={type === "+"}
            />
            <span>Receita</span>
          </label>
        </div>
        <input
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          id="description"
          type="text"
          value={description}
        />
        <input
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoria"
          id="category"
          type="text"
          value={category}
        />
        <div className={styles.flexcol}>
          <input
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor"
            id="value"
            type="number"
            value={value}
          />
          <span>&nbsp;&nbsp;</span>
          <input
            onChange={(e) => setDate(e.target.value)}
            style={{ width: 250 }}
            type="date"
            value={date}
          />
        </div>
      </div>
      <div>
        <a href="/#" onClick={handleSave} className="btn blue">
          Salvar
        </a>
      </div>
    </Modal>
  );
};

export default ModalTransaction;
