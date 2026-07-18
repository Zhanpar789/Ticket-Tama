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
| `npm run dev` | Menjalankan frontend dev server di `http://localhost:3000` |
| `npm run build` | Build frontend untuk production |
| `npm run start` | Menjalankan frontend server production |
| `npm run lint` | Menjalankan ESLint |
| `cd backend && go run ./cmd/server` | Menjalankan backend di `http://localhost:8080` |
| `cd backend && go build -o /tmp/server ./cmd/server` | Build binary backend |

**Catatan:** Belum ada script test. Jika perlu menambahkan test, diskusikan dengan user terlebih dahulu.

## Struktur Direktori

```
src/
  app/
    layout.tsx          # Root layout, font (Plus Jakarta Sans + Inter), metadata
    page.tsx            # Halaman utama (landing page)
    globals.css         # Global CSS + Tailwind theme tokens
    login/page.tsx      # Halaman login (terhubung ke API)
    register/page.tsx   # Halaman registrasi (terhubung ke API)
    dashboard/page.tsx  # Halaman setelah login (protected)
  components/
    Navbar.tsx          # Navigasi (sticky, responsive, mobile hamburger)
    HeroSection.tsx     # Hero banner dengan CTA
    SearchSection.tsx   # Search bar + filter kategori
    EventCards.tsx      # Grid kartu event populer
    HowItWorks.tsx      # Section 3 langkah cara kerja
    Subscription.tsx    # Form berlangganan newsletter
    Footer.tsx          # Footer dengan link navigasi & sosial media
  lib/
    api.ts              # Fetch wrapper + error handling
    auth.ts             # Token storage, request auth, types
  hooks/
    useAuth.ts          # Hook auth state (login/register/logout/me)

backend/
  cmd/server/main.go           # Entry point backend
  internal/
    config/                    # Loader .env
    database/                  # Setup GORM + auto-migrate
    models/                    # Struct User
    repository/                # Query DB
    services/                  # Business logic
    handlers/                  # HTTP handler
    middleware/                # Auth (JWT) + CORS + logger
    utils/                     # JWT + bcrypt helpers
    dto/                       # Request/Response shapes
  data/                        # File SQLite (gitignored)
  .env.example                 # Template env (jangan commit .env)
  go.mod / go.sum
  README.md

public/
  images/               # Gambar statis (event, hero, dll)
  design/               # File desain
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

Tambahkan ke `.env.local` jika perlu override base URL API:
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

- Image dari Unsplash sudah dikonfigurasi di `next.config.ts` via `remotePatterns`.
- Jangan menambahkan library baru tanpa memeriksa apakah sudah ada di `package.json`.
- Prioritaskan penggunaan komponen dan utilitas yang sudah ada sebelum membuat yang baru.
