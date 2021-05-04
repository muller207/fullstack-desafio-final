import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: 'https://igti-fullstack-desafio-final.herokuapp.com/api/transaction',
  headers: {
    'Content-type': 'application/json',
  },
});
