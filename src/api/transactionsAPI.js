import axios from "axios";

const API_URL = "https://buku-kas-digital.vercel.app/api/transactions";

export const fetchTransactionsAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const addTransactionAPI = async (newTransaction) => {
  const response = await axios.post(API_URL, newTransaction);
  return response.data.data;
};