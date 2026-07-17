# AGENTS.md - Panduan AI Assistant untuk TicketTama

## Gambaran Proyek

**TicketTama** adalah platform jual tiket event digital berbahasa Indonesia. Pengguna dapat menemukan dan membeli tiket untuk konser, workshop, olahraga, seni & teater, dan event lainnya. Fitur utama mencakup pencarian event, filter kategori, pemesanan tiket instan, dan tiket digital berbasis QR.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** 19
- **Bahasa:** TypeScript 5
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/postcss`)
- **Package Manager:** npm
- **Linting:** ESLint 9 + `eslint-config-next`

## Perintah Penting

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan dev server di `http://localhost:3000` |
| `npm run build` | Build untuk production |
| `npm run start` | Menjalankan server production |
| `npm run lint` | Menjalankan ESLint |

**Catatan:** Belum ada script test. Jika perlu menambahkan test, diskusikan dengan user terlebih dahulu.

## Struktur Direktori

```
src/
  app/
    layout.tsx          # Root layout, font (Plus Jakarta Sans + Inter), metadata
    page.tsx            # Halaman utama (landing page)
    globals.css         # Global CSS + Tailwind theme tokens
    login/page.tsx      # Halaman login
    register/page.tsx   # Halaman registrasi
  components/
    Navbar.tsx          # Navigasi (sticky, responsive, mobile hamburger)
    HeroSection.tsx     # Hero banner dengan CTA
    SearchSection.tsx   # Search bar + filter kategori
    EventCards.tsx      # Grid kartu event populer
    HowItWorks.tsx      # Section 3 langkah cara kerja
    Subscription.tsx    # Form berlangganan newsletter
    Footer.tsx          # Footer dengan link navigasi & sosial media
public/
  images/               # Gambar statis (event, hero, dll)
  design/               # File desain
```

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

- **Frontend only** - belum terhubung ke backend/API.
- Form login dan register sudah ada validasi client-side, tapi submit belum terhubung ke API.
- Data event masih **hardcoded** di `EventCards.tsx`.
- Gambar event di `EventCards.tsx` belum diimplementasikan (masih placeholder `bg-[#D9D9D9]`).
- Tombol Google login/register sudah ada tapi disabled (belum diimplementasikan).
- Halaman yang sudah ada: `/` (landing), `/login`, `/register`.
- Halaman yang direferensikan tapi belum dibuat: `/event`, `/bantuan`, `/pusat-bantuan`.

## Konvensi Git

- Commit message dalam Bahasa Indonesia atau Inggris, singkat dan deskriptif.

## Catatan Tambahan

- Image dari Unsplash sudah dikonfigurasi di `next.config.ts` via `remotePatterns`.
- Jangan menambahkan library baru tanpa memeriksa apakah sudah ada di `package.json`.
- Prioritaskan penggunaan komponen dan utilitas yang sudah ada sebelum membuat yang baru.
