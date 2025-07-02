# Buku Kas Digital - Frontend

Ini adalah antarmuka pengguna (UI) untuk aplikasi **Buku Kas Digital**. Aplikasi ini berfungsi sebagai klien yang berinteraksi dengan [Backend API](https://www.google.com/search?q=https://github.com/user/buku-kas-backend) untuk melakukan operasi pencatatan keuangan.

Dibangun dengan **React** dan **Vite**, aplikasi ini menggunakan **Tanstack Query (React Query)** untuk manajemen *server state* yang efisien dan **Tailwind CSS** untuk styling yang modern dan responsif.

## Fitur

  - ✅ Menampilkan semua daftar transaksi dari server.
  - ✅ Menambahkan transaksi baru melalui halaman form.
  - ✅ Mengedit detail transaksi yang sudah ada.
  - ✅ Menghapus transaksi dari daftar.
  - ✅ Navigasi antar halaman menggunakan React Router.
  - ✅ UI yang bersih dan fungsional.

## Tampilan Aplikasi

*(Anda bisa menambahkan screenshot aplikasi di sini nanti)*
`![Screenshot Aplikasi Buku Kas](./screenshot.png)`

## Teknologi yang Digunakan

  - **Vite**: *Build tool* generasi baru yang sangat cepat.
  - **React**: Library utama untuk membangun antarmuka pengguna.
  - **React Router DOM**: Untuk menangani *routing* dan navigasi antar halaman.
  - **Tanstack Query (React Query)**: Untuk manajemen *server state* (mengambil, menyimpan cache, dan mengubah data dari API).
  - **Axios**: Untuk melakukan permintaan HTTP ke backend API.
  - **Tailwind CSS**: *Framework* CSS *utility-first* untuk styling.

-----

## Persiapan & Instalasi Lokal

Untuk menjalankan proyek ini di komputer lokal Anda, ikuti langkah-langkah berikut:

**1. Clone Repository**

```bash
git clone https://github.com/Ilham593/buku-kas-digital.git
cd buku-kas-frontend
```

*(Ganti `[URL_REPO_GITHUB_ANDA]` dengan URL repository GitHub Anda sendiri)*

**2. Install Dependensi**

```bash
npm install
```

**3. Konfigurasi URL Backend**
Pastikan backend API sudah berjalan. Buka file `src/api/transactionsAPI.js` dan sesuaikan variabel `API_URL` agar menunjuk ke URL backend Anda.

```javascript
const API_URL = 'http://localhost:5000/api/transactions'; // Contoh untuk lokal
// atau
// const API_URL = 'https://URL-DEPLOYMENT-BACKEND-ANDA.vercel.app/api/transactions';
```

**4. Jalankan Server Development**

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

### Skrip yang Tersedia

  - `npm run dev`: Menjalankan aplikasi dalam mode development.
  - `npm run build`: Membuat *build* aplikasi untuk produksi.
  - `npm run preview`: Menjalankan *build* produksi secara lokal untuk pengetesan.

-----
