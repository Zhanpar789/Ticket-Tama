# AGENTS.md - Panduan AI Assistant untuk TicketTama

## Gambaran Proyek

**TicketTama** adalah platform jual tiket event digital berbahasa Indonesia. Pengguna dapat menemukan dan membeli tiket untuk konser, workshop, olahraga, seni & teater, dan event lainnya. Fitur utama mencakup pencarian event, filter kategori, pemesanan tiket instan, dan tiket digital berbasis QR.

## Tech Stack

**Frontend:**
- **Framework:** Next.js 16 (App Router)
- **React:** 19
- **Bahasa:** TypeScript 5
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/postcss`)
- **Package Manager:** npm
- **Linting:** ESLint 9 + `eslint-config-next`

**Backend:**
- **Bahasa:** Go 1.22+
- **HTTP Framework:** Gin
- **ORM:** GORM
- **Database:** SQLite (file-based, di `backend/data/`)
- **Auth:** JWT (access token di response, refresh token via httpOnly cookie)
- **Password Hash:** bcrypt

## Perintah Penting

| Perintah | Deskripsi |
|---|---|
| `cd frontend && npm run dev` | Menjalankan frontend dev server di `http://localhost:3000` |
| `cd frontend && npm run build` | Build frontend untuk production |
| `cd frontend && npm run start` | Menjalankan frontend server production |
| `cd frontend && npm run lint` | Menjalankan ESLint |
| `cd backend && go run ./cmd/server` | Menjalankan backend di `http://localhost:8080` |
| `cd backend && go build -o /tmp/server ./cmd/server` | Build binary backend |

**Catatan:** Belum ada script test. Jika perlu menambahkan test, diskusikan dengan user terlebih dahulu.

## Struktur Direktori (Monorepo)

```
Website-TicketTama/
├── agents.md                 # Panduan untuk AI assistant
├── README.md
├── .gitignore                # Root-level ignores
│
├── frontend/                 # Next.js 16 (App Router)
│   ├── src/
│   │   ├── app/              # Routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── dashboard/page.tsx
│   │   ├── components/       # Komponen UI
│   │   ├── lib/              # api.ts, auth.ts
│   │   └── hooks/            # useAuth.ts
│   ├── public/               # Aset statis (images, design)
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   └── .gitignore
│
└── backend/                  # Go 1.22+ (Gin + GORM + SQLite)
    ├── cmd/server/main.go
    ├── internal/
    │   ├── config/
    │   ├── database/
    │   ├── models/
    │   ├── repository/
    │   ├── services/
    │   ├── handlers/
    │   ├── middleware/
    │   ├── utils/
    │   └── dto/
    ├── data/                 # File SQLite (gitignored)
    ├── .env.example
    ├── .gitignore
    ├── go.mod / go.sum
    └── README.md
```

## API Backend (Auth)

Base URL: `http://localhost:8080/api`

| Method | Path                | Auth   | Body / Cookie                              | Response                                                  |
|--------|---------------------|--------|--------------------------------------------|-----------------------------------------------------------|
| POST   | `/auth/register`    | -      | `{nama_lengkap, email, password}`          | `{user, access_token}` + Set-Cookie `refresh_token`       |
| POST   | `/auth/login`       | -      | `{email, password}`                        | `{user, access_token}` + Set-Cookie `refresh_token`       |
| POST   | `/auth/refresh`     | Cookie | -                                          | `{access_token}` + rotated Set-Cookie                     |
| POST   | `/auth/logout`      | -      | -                                          | `{message}` + Clear-Cookie                                |
| GET    | `/auth/me`          | Bearer | -                                          | `{user: {id, nama_lengkap, email}}`                       |
| GET    | `/health`           | -      | -                                          | `{status: "ok"}`                                          |

Field response menggunakan **snake_case** (`nama_lengkap`, `access_token`).

## Environment Variables Backend

Salin `backend/.env.example` ke `backend/.env` lalu generate secret baru:
```bash
cp backend/.env.example backend/.env
openssl rand -hex 32   # jalankan 2x untuk JWT_ACCESS_SECRET & JWT_REFRESH_SECRET
```

Variabel yang tersedia (lihat `backend/.env.example`):
- `APP_PORT` (default 8080)
- `APP_ENV` (`development` / `production`)
- `DB_PATH` (default `data/tickettama.db`)
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` (wajib, min 32 char random)
- `JWT_ACCESS_TTL` (default `15m`)
- `JWT_REFRESH_TTL` (default `168h` = 7 hari)
- `CORS_ORIGIN` (default `http://localhost:3000`)

## Environment Variables Frontend

Tambahkan ke `frontend/.env.local` jika perlu override base URL API:
- `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8080/api`)

## Konvensi Kode

### Path Alias
Gunakan `@/` yang mengarah ke `./src/`. Contoh: `import Navbar from "@/components/Navbar"`.

### Komponen
- Semua komponen berada di `src/components/`.
- Komponen yang menggunakan state (`useState`, `useEffect`, dll) wajib menggunakan directive `"use client"`.
- Komponen yang hanya render JSX statis tidak perlu `"use client"` (server component).
- Penamaan komponen: **PascalCase**, default export.

### Styling
- Gunakan **Tailwind utility classes** secara langsung di JSX.
- Gunakan **design tokens** yang sudah didefinisikan di `globals.css` via `@theme inline`:
  - Warna: `primary` (#2663EB), `primary-dark` (#1155E2), `accent` (#F59E0C), `dark` (#2C2C2C), `body` (#1E1E1E), `muted` (#757575), `border` (#B2B2B2), `surface` (#F8F9FA), `icon` (#B3B3B3)
  - Font: `font-heading` (Plus Jakarta Sans), `font-body` (Inter)
- Contoh penggunaan: `bg-primary`, `text-muted`, `font-heading`, `border-border`.
- **Jangan** menambahkan warna atau font baru tanpa mengikuti sistem token yang sudah ada.

### Tipografi
- Heading menggunakan `font-heading` (Plus Jakarta Sans).
- Body text menggunakan `font-body` (Inter).
- Ukuran font dan line-height ditulis eksplisit, contoh: `font-heading font-bold text-[28px] leading-[35px]`.

### Layout
- Max-width container: `max-w-[1100px]` atau `max-w-[1280px]`.
- Horizontal padding konsisten: `px-[90px]`.
- Gunakan `mx-auto` untuk centering.

### Bahasa UI
- Semua teks UI menggunakan **Bahasa Indonesia**.

## Status Proyek

- **Backend Go sudah terpasang** dengan auth lengkap (register, login, logout, refresh, me).
- Frontend sudah terhubung ke backend melalui `src/lib/api.ts` & `src/hooks/useAuth.ts`.
- Token access disimpan di `localStorage`, refresh token di httpOnly cookie.
- Setelah login/register, user di-redirect ke `/dashboard`.
- Data event masih **hardcoded** di `EventCards.tsx`.
- Gambar event di `EventCards.tsx` belum diimplementasikan (masih placeholder `bg-[#D9D9D9]`).
- Tombol Google login/register masih disabled (belum diimplementasikan).
- Halaman yang sudah ada: `/` (landing), `/login`, `/register`, `/dashboard`.
- Halaman yang direferensikan tapi belum dibuat: `/event`, `/bantuan`, `/pusat-bantuan`.

## Konvensi Git

- Commit message dalam Bahasa Indonesia atau Inggris, singkat dan deskriptif.

## Catatan Tambahan

- Image dari Unsplash sudah dikonfigurasi di `frontend/next.config.ts` via `remotePatterns`.
- Jangan menambahkan library baru tanpa memeriksa apakah sudah ada di `frontend/package.json` (frontend) atau `backend/go.mod` (backend).
- Prioritaskan penggunaan komponen dan utilitas yang sudah ada sebelum membuat yang baru.
- Repo ini monorepo: `frontend/` untuk Next.js, `backend/` untuk Go service. Jalankan masing-masing dari foldernya sendiri.
