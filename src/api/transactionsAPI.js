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

export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data.data
};

export const fetchTransactionById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
}


export const updateTransactionAPI = async ({id, updateData}) => {
  const response = await axios.patch(`${API_URL}/${id}`, updateData);
  return response.data.data;
};