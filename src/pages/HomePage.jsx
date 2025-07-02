import {
  fetchTransactionsAPI,
  deleteTransactionAPI,
} from "../api/transactionsAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function HomePage() {
  const queryClient = useQueryClient();

  const {
    data: transactions,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactionsAPI,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  let content;

  if (isLoading) {
    content = <p className="text-white">Loading...</p>;
  } else if (isError) {
    content = <p className="text-red-500">{error.message}</p>;
  } else {
    content = (
      <ul className="text-white space-y-3">
        {transactions.map((t) => (
          <li
            key={t._id}
            className="flex justify-between items-center bg-gray-700 p-3 rounded-md"
          >
            <div>
              <span className="font-semibold block">{t.description}</span>
              <span
                className={
                  t.type === "pemasukan" ? "text-green-400" : "text-red-400"
                }
              >
                Rp{t.amount.toLocaleString("id-ID")}
              </span>
            </div>
            {/* 4. Tambahkan tombol Hapus */}
            <button
              onClick={() => handleDelete(t._id)}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs disabled:bg-gray-500"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
        Daftar Transaksi
      </h1>
      {content}
    </div>
  );
}
