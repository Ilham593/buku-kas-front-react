import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchTransactionById,
  updateTransactionAPI,
} from "../api/transactionsAPI";

export default function EditTransactionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State untuk form
  const [type, setType] = useState("pemasukan");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // 2. Gunakan useQuery untuk mengambil data transaksi yang akan diedit
  const {
    data: transaction,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions", id],
    queryFn: () => fetchTransactionById(id),
  });

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(transaction.amount);
      setDescription(transaction.description);
    }
  }, [transaction]);

  const updateMutation = useMutation({
    mutationFn: updateTransactionAPI,
    onSuccess: async () => {
      // Invalidasi cache agar list dan detail ter-update
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      navigate("/"); // Kembali ke halaman utama
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = { type, amount: Number(amount), description };
    updateMutation.mutate({ id, updateData });
  };

  if (isLoading)
    return <p className="text-white text-center">Loading form...</p>;
  if (isError)
    return <p className="text-red-500 text-center">Error: {error.message}</p>;

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
        Edit Transaksi
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input untuk Tipe */}
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

        {/* Input untuk Deskripsi */}
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

        {/* Input untuk Jumlah */}
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

        {/* Tombol Submit */}
        <div>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-500"
          >
            {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
