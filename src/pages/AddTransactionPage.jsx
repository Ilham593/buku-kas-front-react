import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTransactionAPI } from "../api/transactionsAPI";
import { useNavigate } from "react-router-dom";

export default function AddTransactionPage() {
  // state untuk menamupung form
  const [type, setType] = useState("pemasukan");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // hook untuk navigasi dan invalidasi cache
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addTransactionAPI,
    onSuccess: () => {
      // invalidasi cache
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      type,
      amount: Number(amount),
      description,
    };
    mutate(newTransaction);
  };
  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
        Tambah Transaksi Baru
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-300"
          >
            Tipe
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Deskripsi
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300"
          >
            Jumlah (Rp)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-500"
          >
            {isPending ? "Menyimpan..." : "Simpan Transaksi"}
          </button>
        </div>
      </form>
    </div>
  );
}
