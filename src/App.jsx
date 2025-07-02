import { Outlet, Link } from "react-router-dom";
export default function App() {
  return (
    <div className="grid h-screen place-content-center bg-gray-900 font-sans">
      <nav className="p-4 bg-gray-800 text-white rounded-t-lg">
        <ul className="flex justify-center gap-6">
          <li>
            <Link to="/" className="hover:text-cyan-400">Beranda</Link>
          </li>
          <li>
            <Link to="/tambah" className="hover:text-cyan-400">Tambah Transaksi</Link>
          </li>
        </ul>
      </nav>
      <main className="p-4">
        {/* Konten halaman akan dirender di sini */}
        <Outlet /> 
      </main>
    </div>
  );
}