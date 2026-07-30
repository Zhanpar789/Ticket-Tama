# TicketTama

Platform tiket event digital berbahasa Indonesia. Pengunjung dapat menelusuri event, melihat detailnya, lalu membuat akun untuk mengelola profil. Autentikasi menggunakan access token JWT dan refresh token dalam cookie `httpOnly`.

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 |
| Backend | Go 1.26.5, Gin, GORM |
| Database | SQLite |
| Autentikasi | JWT, bcrypt, refresh token cookie |
| Deployment frontend | Netlify |

## Fitur Saat Ini

- Landing page dengan pencarian dan kategori event.
- Katalog event dan halaman detail event.
- Registrasi, login, logout, pembaruan access token, serta informasi akun aktif.
- Halaman profil dengan foto, data kontak, pilihan kode negara, dan alamat.
- Ubah kata sandi dengan validasi kekuatan kata sandi.
- Navbar responsif yang menyesuaikan status autentikasi.

Data event masih bersifat hardcoded dan alur pembelian/tiket digital belum tersedia.

## Prasyarat

- Node.js 22 atau yang kompatibel dengan Next.js 16.
- npm.
- Go 1.26.5 atau versi yang sesuai dengan `backend/go.mod`.
- Pada macOS, instal Xcode Command Line Tools bila SQLite gagal dikompilasi: `xcode-select --install`.

## Menjalankan Secara Lokal

Jalankan backend dan frontend di dua terminal terpisah.

### 1. Konfigurasi dan jalankan backend

```bash
cd backend
cp .env.example .env
```

Ganti nilai `JWT_ACCESS_SECRET` dan `JWT_REFRESH_SECRET` di `backend/.env` dengan dua secret berbeda. Masing-masing dapat dibuat dengan:

```bash
openssl rand -hex 32
```

Kemudian jalankan server:

```bash
go run ./cmd/server
```

API tersedia di `http://localhost:8080/api` dan database SQLite akan dibuat di `backend/data/tickettama.db`.

### 2. Jalankan frontend

```bash
cd frontend
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Konfigurasi Environment

### Backend

Salin `backend/.env.example` menjadi `backend/.env` sebelum menjalankan server.

| Variabel | Default | Keterangan |
| --- | --- | --- |
| `APP_PORT` | `8080` | Port HTTP backend. |
| `APP_ENV` | `development` | Gunakan `production` untuk mode rilis Gin. |
| `DB_PATH` | `data/tickettama.db` | Lokasi database SQLite relatif terhadap `backend/`. |
| `JWT_ACCESS_SECRET` | - | Secret access token, wajib diganti. |
| `JWT_REFRESH_SECRET` | - | Secret refresh token, wajib diganti. |
| `JWT_ACCESS_TTL` | `15m` | Masa berlaku access token. |
| `JWT_REFRESH_TTL` | `168h` | Masa berlaku refresh token. |
| `CORS_ORIGIN` | `http://localhost:3000` | Origin frontend yang diizinkan. |

### Frontend

Secara default frontend menggunakan API lokal. Buat `frontend/.env.local` bila endpoint API perlu diubah:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

## Perintah Penting

| Perintah | Keterangan |
| --- | --- |
| `cd frontend && npm run dev` | Menjalankan frontend development server. |
| `cd frontend && npm run lint` | Menjalankan ESLint. |
| `cd frontend && npm run build` | Membuat production build frontend. |
| `cd frontend && npm run start` | Menjalankan production build frontend. |
| `cd backend && go run ./cmd/server` | Menjalankan API backend. |
| `cd backend && go build -o /tmp/server ./cmd/server` | Memastikan backend dapat dibangun. |

Belum tersedia test suite otomatis.

## Rute Frontend

| Rute | Keterangan |
| --- | --- |
| `/` | Landing page. |
| `/event` | Katalog event. |
| `/event/[id]` | Detail event. |
| `/login` | Masuk. |
| `/register` | Pendaftaran akun. |
| `/profile` | Profil pengguna dan ubah kata sandi. |
| `/dashboard` | Halaman auth legacy sederhana. |

## API

Base URL lokal: `http://localhost:8080/api`

| Method | Endpoint | Autentikasi | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/health` | - | Health check. |
| `POST` | `/auth/register` | - | Membuat akun dan mengirim access token. |
| `POST` | `/auth/login` | - | Masuk dan mengirim access token. |
| `POST` | `/auth/refresh` | Cookie | Memperbarui access token dan merotasi refresh cookie. |
| `POST` | `/auth/logout` | - | Menghapus refresh cookie. |
| `GET` | `/auth/me` | Bearer | Mengambil akun aktif. |
| `POST` | `/auth/change-password` | Bearer | Mengubah kata sandi. |

Contoh pendaftaran:

```json
{
  "nama_lengkap": "Budi Santoso",
  "email": "budi@example.com",
  "password": "Password123"
}
```

Respons autentikasi menggunakan field `snake_case` dan memiliki bentuk berikut:

```json
{
  "user": {
    "id": 1,
    "nama_lengkap": "Budi Santoso",
    "email": "budi@example.com"
  },
  "access_token": "eyJ..."
}
```

Refresh token dikirim sebagai cookie `httpOnly`. Kata sandi harus berisi minimal delapan karakter, huruf besar dan kecil, serta setidaknya satu angka atau karakter khusus.

## Struktur Repository

```text
Website-TicketTama/
├── frontend/              # Next.js App Router
│   └── src/
│       ├── app/           # Rute aplikasi
│       ├── components/    # Komponen antarmuka
│       ├── contexts/      # Auth dan profile context
│       └── lib/           # API client dan utilitas
├── backend/               # API Go
│   ├── cmd/server/        # Entry point
│   ├── internal/          # Handler, service, repository, middleware
│   └── data/              # SQLite, tidak dilacak Git
├── netlify.toml           # Konfigurasi deployment frontend
└── AGENTS.md              # Panduan kontribusi untuk AI assistant
```

## Deployment

`netlify.toml` sudah mengatur `frontend/` sebagai base directory Netlify serta menjalankan `npm run build`. Saat deploy, atur `NEXT_PUBLIC_API_BASE_URL` ke URL API production dan sesuaikan `CORS_ORIGIN` backend dengan domain frontend production.

## Dokumentasi Lain

- [Dokumentasi backend](backend/README.md)
- [Panduan proyek untuk AI assistant](AGENTS.md)
