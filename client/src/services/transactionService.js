import http from "../http-common";

const getTransactions = (period, description) => {
  let path = `/?period=${period}`;
  path += !description ? "" : `&description=${description}`;
  return http.get(path);
};

const newTransaction = (transaction) => {
  return http.post("/", transaction);
};

const updateTransaction = (transaction) => {
  const id = transaction._id;
  return http.patch("/" + id, transaction);
};

const removeTransaction = (transaction) => {
  return http.delete("/" + transaction._id);
};

export default { getTransactions, newTransaction, updateTransaction, removeTransaction };
