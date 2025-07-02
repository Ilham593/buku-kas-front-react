import { fetchTransactionsAPI } from "../api/transactionsAPI";
import { useQuery } from "@tanstack/react-query";


export default function HomePage() {
  const { 
    data: transactions, 
    error, 
    isLoading,
    isError
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactionsAPI,
  });

  let content;

  if (isLoading) {
    content = <p className="text-white">Loading...</p>;
  } else if (isError) {
    content = <p className="text-red-500">{error.message}</p>;
  } else {
    content = (
      <ul className="text-white list-disc pl-5">
        {transactions.map((t) => (
          <li key={t._id} className="mb-2">
            <span className="font-semibold">{t.description}</span> - 
            <span className={t.type === 'pemasukan' ? 'text-green-400' : 'text-red-400'}>
              Rp{t.amount.toLocaleString('id-ID')}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Daftar Transaksi</h1>
      {content}
    </div>
  );
}