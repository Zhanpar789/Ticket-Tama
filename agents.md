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
│   │   │   ├── dashboard/page.tsx
│   │   │   └── profile/page.tsx       # Halaman Profil Saya (sidebar + form)
│   │   ├── components/       # Komponen UI
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SearchSection.tsx
│   │   │   ├── EventCards.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Subscription.tsx
│   │   │   ├── Providers.tsx          # Wrapper client: AuthProvider > ProfileProvider
│   │   │   ├── ProfileSidebar.tsx     # Sidebar Profil Saya / Ticket Saya / Keluar
│   │   │   ├── Avatar.tsx             # Reusable: foto atau inisial nama
│   │   │   ├── PhoneInput.tsx         # Input telepon + dropdown negara
│   │   │   ├── ChangePasswordModal.tsx
│   │   │   └── Toast.tsx              # Notifikasi (success/info), auto-dismiss 12s
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx        # Single source of truth untuk auth state
│   │   │   └── ProfileContext.tsx     # Profile data (foto, nama, dll) sync ke navbar
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts                # API call: register, login, logout, fetchMe, changePasswordRequest
│   │   │   ├── profile.ts             # ProfileData type + profileStorage (localStorage per-user)
│   │   │   └── countries.ts           # ~190 negara (code, name, dialCode) + helper
│   │   └── hooks/
│   │   │   └── useAuth.ts             # Re-export useAuth dari AuthContext
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
    │   ├── utils/           # password.go (HashPassword, ComparePassword, ValidatePasswordStrength)
    │   └── dto/             # auth_dto.go (RegisterRequest, LoginRequest, ChangePasswordRequest, dll)
    ├── data/                 # File SQLite (gitignored)
    ├── .env.example
    ├── .gitignore
    ├── go.mod / go.sum
    └── README.md
```

## API Backend (Auth)

Base URL: `http://localhost:8080/api`

| Method | Path                       | Auth   | Body / Cookie                                  | Response                                                  |
|--------|----------------------------|--------|------------------------------------------------|-----------------------------------------------------------|
| POST   | `/auth/register`           | -      | `{nama_lengkap, email, password}`              | `{user, access_token}` + Set-Cookie `refresh_token`       |
| POST   | `/auth/login`              | -      | `{email, password}`                            | `{user, access_token}` + Set-Cookie `refresh_token`       |
| POST   | `/auth/refresh`            | Cookie | -                                              | `{access_token}` + rotated Set-Cookie                     |
| POST   | `/auth/logout`             | -      | -                                              | `{message}` + Clear-Cookie                                |
| GET    | `/auth/me`                 | Bearer | -                                              | `{user: {id, nama_lengkap, email}}`                       |
| POST   | `/auth/change-password`    | Bearer | `{current_password, new_password}`             | `{message}` atau `{error}` (lihat status code di bawah)   |
| GET    | `/health`                  | -      | -                                              | `{status: "ok"}`                                          |

Field response menggunakan **snake_case** (`nama_lengkap`, `access_token`).

### Error responses `/auth/change-password`

| Status | `error`                                                | Skenario |
|--------|--------------------------------------------------------|----------|
| 400    | `Kata sandi lama salah`                                | `current_password` tidak cocok |
| 400    | `Kata sandi baru tidak boleh sama dengan kata sandi lama` | Password baru = password lama |
| 400    | `Kata sandi baru tidak memenuhi syarat kekuatan`       | Gagal strength check (min 8, upper+lower, number/special) |
| 404    | `User tidak ditemukan`                                 | User ID dari token tidak ada di DB |
| 422    | (dari gin binding)                                     | Field kosong / < 8 char |

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
Gunakan `@/` yang mengarah ke `./src/` (relative terhadap `frontend/tsconfig.json` → `frontend/src/`). Contoh: `import Navbar from "@/components/Navbar"`.

### Komponen
- Semua komponen berada di `frontend/src/components/`.
- Komponen yang menggunakan state (`useState`, `useEffect`, dll) wajib menggunakan directive `"use client"`.
- Komponen yang hanya render JSX statis tidak perlu `"use client"` (server component).
- Penamaan komponen: **PascalCase**, default export.
- **Auth-aware components**: komponen yang butuh data user (mis. Navbar) harus pakai `useAuth()` dari `@/hooks/useAuth`, bukan baca `localStorage` langsung. Initial state `loading` di hook sudah di-handle untuk anti hydration mismatch.
- **Profile-aware components**: komponen yang butuh profile (foto, nama) pakai `useProfile()` dari `@/contexts/ProfileContext`.

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
- Horizontal padding: `px-6 md:px-[90px]` (konsisten dengan referensi layout, responsif di mobile).
- Gunakan `mx-auto` untuk centering.

### Bahasa UI
- Semua teks UI menggunakan **Bahasa Indonesia**.

## Pola Penting (Patterns)

### 1. AuthContext — WAJIB dipakai, BUKAN `useState` lokal

`useAuth` sudah di-convert dari hook dengan `useState` lokal menjadi **React Context** (`frontend/src/contexts/AuthContext.tsx`). Ini adalah **single source of truth** untuk auth state.

**Kenapa penting:** kalau pakai `useState` lokal, setiap komponen yang panggil `useAuth()` punya state sendiri. Akibatnya `ProfileProvider` tidak tahu `LoginPage` sudah update state → setelah login user harus refresh manual supaya data profile dari localStorage muncul.

**Pattern yang benar:**
- `hooks/useAuth.ts` cuma `export { useAuth } from "@/contexts/AuthContext"` (jangan tulis ulang)
- `Providers.tsx` WAJIB bungkus `<AuthProvider>` di luar `<ProfileProvider>` (karena ProfileProvider butuh `useAuth()`)
- Semua komponen yang butuh auth state panggil `useAuth()` — mereka semua baca dari context yang sama, otomatis sinkron

### 2. ProfileContext — data profile + sync ke navbar

`frontend/src/contexts/ProfileContext.tsx` menyimpan `{ profile, isHydrated }` + methods `updateProfile`, `updateFoto`, `updateField`, `resetProfile`.

**localStorage key: `tt_profile_${userId}`** (per-user, bukan global). Data disimpan dengan spread `defaultProfile` dulu lalu `stored` (backward compat untuk data lama tanpa `country_code_*`).

`ProfileData` type fields: `foto`, `nama_lengkap`, `email`, `nomor_telepon`, `country_code_telepon` (default "ID"), `nomor_whatsapp`, `country_code_whatsapp` (default "ID"), `whatsapp_sama_dengan_telepon`, `alamat_lengkap`.

### 3. Pola "Live preview vs Save sync" di halaman profil

Untuk UX yang konsisten, data form dibedakan sumbernya:
- **Live preview** (langsung berubah saat user mengetik/upload, sebelum save): avatar besar di profile page → pakai `form.foto` agar user bisa review foto baru
- **Save sync** (baru berubah setelah klik Simpan): semua yang ditampilkan di Navbar / dropdown / nama di samping avatar → pakai `profile.*` (data tersimpan)

**Alasan:** upload foto perlu feedback visual langsung supaya user bisa review posisi/crop, tapi field teks (nama/email) tidak boleh live-sync ke navbar sebelum user explicitly confirm.

### 4. Save flow di profile page (sessionStorage + reload)

1. User klik "Simpan Perubahan"
2. Validasi client-side
3. `setIsSaving(true)` + `setTimeout(400ms)` (feedback loading)
4. `profileStorage.set(payload, user.id)` → simpan ke localStorage
5. `sessionStorage.setItem("tt_profile_saved", "1")` → flag
6. `window.location.reload()` → hard reload
7. Setelah reload, useEffect di profile page baca flag → `setSuccess(true)` → toast muncul
8. Toast auto-dismiss 12s (atau klik X)

**Kenapa hard reload?** context auto-reinit dari localStorage, sehingga avatar/nama di Navbar & profile section langsung sinkron tanpa manual refresh. Tanpa reload, context tidak update.

### 5. PhoneInput dengan country code dropdown

- Props: `value`, `onChange`, `countryCode` (ISO 3166-1 alpha-2), `onCountryChange`, `hasError?`, `id?`, `placeholder?`
- Dropdown trigger: klik bagian `[flag] +XX [chevron]` di kiri input
- Search: filter by nama negara / dial code / ISO code
- Section "Negara Populer" tampil saat search kosong (ID, VN, TH, SG, MY, PH)
- Flag dari `https://flagsapi.com/{CODE}/flat/32.png` (sudah ditambahkan ke `next.config.ts` `remotePatterns`)
- Default country: "ID" (`DEFAULT_COUNTRY_CODE` di `lib/countries.ts`)
- Tutup dropdown: klik luar / Escape / klik negara

### 6. Toast component

- Props: `show`, `onClose`, `message`, `duration?` (default `12000` ms)
- Posisi: `fixed top-[92px] right-6` (di pojok kanan atas, di bawah navbar)
- Style: `border-l-[5px] border-emerald-500` + icon lingkaran emerald + X button kanan
- Animasi: `toast-slide-down` keyframe di `globals.css` (250ms ease-out)
- Auto-dismiss via `setTimeout` di `useEffect` (cleanup saat unmount/show berubah)
- Dipakai untuk: "Data berhasil disimpan" (profile save), "Berhasil mengubah kata sandi" (change password)

## Status Proyek

- **Backend Go sudah terpasang** dengan auth lengkap (register, login, logout, refresh, me, change-password).
- Frontend sudah terhubung ke backend melalui `frontend/src/lib/api.ts` & `frontend/src/lib/auth.ts`.
- Token access disimpan di `localStorage`, refresh token di httpOnly cookie.
- Setelah login/register, user di-redirect ke `/` (landing), bukan `/dashboard`.
- **`/dashboard`** adalah halaman profil sederhana (cek token, fetch `/me`, tombol logout legacy) — bukan tujuan post-login.
- **Halaman `/profile`** (`frontend/src/app/profile/page.tsx`) sudah selesai:
  - Sidebar kiri (Profil Saya / Ticket Saya / Keluar) — `ProfileSidebar.tsx`
  - 3 stats card: Total Ticket, Event Dihadiri, Total Pembelian (semua `-` / null untuk sekarang)
  - Avatar 80px dengan **live preview** dari `form.foto` (Ubah Foto / Hapus Foto button)
  - Tombol "Ubah Kata Sandi" → buka `ChangePasswordModal`
  - Badge "Email Belum Diverifikasi" merah
  - Form: Nama Lengkap*, Email*, Nomor Telepon* (PhoneInput dengan country code), Nomor WhatsApp (PhoneInput, mirror jika `whatsapp_sama_dengan_telepon`), Alamat Lengkap* (textarea)
  - Save flow: reload + toast (lihat Pola #4)
  - **Fitur yang belum diimplementasi di profile page**: tombol "Ubah Kata Sandi" sudah enabled, "Akun Terverifikasi" masih merah, total tiket/event/pembelian masih null
- **Navbar responsif auth-aware** (`frontend/src/components/Navbar.tsx`):
  - Loading: spacer kosong (anti layout shift, anti hydration mismatch)
  - Authenticated: avatar (dari `profile.foto` atau inisial) + nama (dari `profile.nama_lengkap`) + chevron, click → dropdown overlay
  - Unauthenticated: tombol Masuk + Daftar
  - Mobile logged-in: 1 icon profile di kanan (tanpa hamburger), dropdown memuat Event, Bantuan + Profil Saya, Tiket Saya, Keluar
  - Desktop logged-in: Event & Bantuan di center navbar (tidak di dropdown); dropdown hanya Profil Saya, Tiket Saya, Keluar
  - Logout dari dropdown menampilkan fake loading overlay (~1.5s) dengan spinner + logo TicketTama sebelum benar-benar logout dan redirect ke `/`
- **useAuth pattern**: sudah di-convert ke React Context (`AuthContext.tsx`) — JANGAN tulis ulang sebagai hook dengan local `useState` (lihat Pola #1)
- **Modal Ubah Kata Sandi** (`ChangePasswordModal.tsx`):
  - 3 field password dengan eye toggle + autoComplete native
  - 3 rules indicator real-time: min 8 char, upper+lower, number/special (lingkaran hijau/merah)
  - Validasi: required, strength, konfirmasi harus match
  - Map error backend: 400 "lama" → field current, 400 "sama dengan" → field current, error lain → banner atas tombol
  - Tutup otomatis: backdrop click / Escape / sukses
  - Lock body scroll + auto-focus field pertama saat dibuka
  - Sukses → toast "Berhasil mengubah kata sandi" (komponen Toast yang sama dengan profile save)
- **Toast component** (`Toast.tsx`): notifikasi reusable dengan auto-dismiss 12s + X button
- **ProfileContext** (`ProfileContext.tsx`): share profile state ke semua komponen, localStorage per-user key
- **Avatar component** (`Avatar.tsx`): reusable `<Avatar src name size textClass />` (foto atau inisial)
- **PhoneInput component** (`PhoneInput.tsx`): input telepon dengan dropdown negara, search, popular countries
- **Countries data** (`lib/countries.ts`): ~190 negara dengan `{ code, name, dialCode }` + helper `getCountryByCode`
- **Netlify deployment**: `netlify.toml` di root dengan `base = "frontend"` agar build command jalan di dalam folder frontend (tanpa ini, Netlify gagal karena `package.json` ada di subfolder).
- Data event masih **hardcoded** di `EventCards.tsx`.
- Gambar event di `EventCards.tsx` belum diimplementasikan (masih placeholder `bg-[#D9D9D9]`).
- Tombol Google login/register masih disabled (belum diimplementasikan).
- Halaman yang sudah ada: `/` (landing), `/login`, `/register`, `/dashboard`, `/profile`.
- Halaman yang direferensikan tapi belum dibuat: `/event`, `/bantuan`, `/pusat-bantuan`.

## Konvensi Git

- Commit message dalam Bahasa Indonesia atau Inggris, singkat dan deskriptif.
- Conventional Commits style: `feat:`, `fix:`, `chore:`, dll.
- Branch naming: `feature/<nama-fitur>` atau `fix/<deskripsi-singkat>`.

## Catatan Tambahan

- Image remote yang sudah dikonfigurasi di `frontend/next.config.ts` via `remotePatterns`:
  - `images.unsplash.com` (event images)
  - `flagsapi.com` (country flags di PhoneInput dropdown)
- Jangan menambahkan library baru tanpa memeriksa apakah sudah ada di `frontend/package.json` (frontend) atau `backend/go.mod` (backend).
- Prioritaskan penggunaan komponen dan utilitas yang sudah ada sebelum membuat yang baru.
- Repo ini monorepo: `frontend/` untuk Next.js, `backend/` untuk Go service. Jalankan masing-masing dari foldernya sendiri.
- **Mobile breakpoint**: `md` (768px). Default mobile = `< 768px`, desktop = `>= 768px`.
- **Hydration-sensitive code**: kalau membuat client component yang baca storage (localStorage/sessionStorage/cookies) atau pakai `Date.now()`/random, **SELALU** render state yang sama di server dan client pada first render. Set initial state konservatif (loading/empty), baca storage di `useEffect`.
- **ESLint disable untuk setState di useEffect**: pattern `// eslint-disable-next-line react-hooks/set-state-in-effect` dipakai di beberapa effect yang baca storage lalu set state (mis. `AuthContext` mount effect, `ProfileContext` mount effect, `Toast` di profile page untuk baca `tt_profile_saved` flag). Ini false positive — pattern ini memang yang direkomendasikan untuk read-from-storage-on-mount. Lihat `useAuth.ts` lama untuk referensi.
- **Password rules** (konsisten antara frontend `PasswordField` rules & backend `utils.ValidatePasswordStrength`): min 8 karakter, harus ada huruf besar + kecil, minimal 1 angka ATAU karakter khusus. Lokasi: `ChangePasswordModal.tsx` (frontend) & `backend/internal/utils/password.go` (backend).
