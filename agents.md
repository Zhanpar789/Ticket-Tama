# TicketTama — Agent Instructions

## Project Overview

**TicketTama** adalah platform jual-beli tiket event digital berbasis web. Dibangun dengan Next.js 16 (App Router), React 19, TypeScript, dan Tailwind CSS v4.

### Tech Stack

| Bagian        | Teknologi                                          |
| ------------- | --------------------------------------------------- |
| Framework     | Next.js 16 (App Router)                             |
| Bahasa        | TypeScript (strict)                                 |
| UI            | React 19, Tailwind CSS v4                           |
| Font          | Plus Jakarta Sans (heading), Inter (body)           |
| Linter        | ESLint with `eslint-config-next`                    |
| Package Mgr   | npm                                                 |

### Struktur Folder

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 theme variables
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   ├── page.tsx             # Homepage
│   ├── login/page.tsx       # Login page (empty — placeholder)
│   └── register/page.tsx    # Register page (with form validation)
└── components/
    ├── Navbar.tsx           # Navigation bar (responsive, mobile menu)
    ├── HeroSection.tsx      # Hero with CTA and event highlight
    ├── SearchSection.tsx    # Search bar + category filter pills
    ├── EventCards.tsx       # Grid of event cards (with mock data)
    ├── HowItWorks.tsx       # 3-step instructions
    ├── Subscription.tsx     # Newsletter email subscription
    └── Footer.tsx           # Footer with links and social icons
```

### Routing

| Path       | Halaman        |
| ---------- | -------------- |
| `/`        | Homepage       |
| `/login`   | Login (empty)  |
| `/register`| Register       |

### Theme (Tailwind CSS v4 via `@theme inline`)

```
primary:      #2663EB
primary-dark: #1155E2
accent:       #F59E0C
dark:         #2C2C2C
body:         #1E1E1E
muted:        #757575
border:       #B2B2B2
surface:      #F8F9FA
icon:         #B3B3B3
```

### Scripts (package.json)

| Perintah       | Fungsi                        |
| -------------- | ----------------------------- |
| `npm run dev`  | Jalankan dev server (Next.js) |
| `npm run build`| Build production              |
| `npm run start`| Start production server       |
| `npm run lint` | ESLint check                  |

## Aturan Pengembangan

1. **Gunakan "use client" hanya jika perlu** — komponen interaktif (state, event handler, hooks) membutuhkannya; komponen statis cukup server component.
2. **Path alias** — gunakan `@/` yang sudah di-mapping ke `src/` (via `tsconfig.json` paths).
3. **Gambar** — simpan di `public/images/`. Untuk external images (Unsplash), daftarkan domain di `next.config.ts`.
4. **Jangan tambahkan komentar** kecuali diminta secara eksplisit.
5. **Tailwind utility classes** lebih diutamakan daripada CSS kustom.
6. **Shadow pattern yang dipakai**: `shadow-[0px_1px_4px_rgba(12,12,13,0.1),0px_1px_4px_rgba(12,12,13,0.05)]`.
7. **Border radius**: umumnya `rounded-lg` (8px) atau `rounded-xl` (12px).
8. **Container max-width**: `max-w-[1100px]` (konten) atau `max-w-[1280px]` (full layout). Padding horizontal: `px-[90px]`.
9. **Bahasa**: Indonesia (id). Semua teks UI dalam Bahasa Indonesia.

## Pola Komponen

```tsx
// Server component (default)
export default function SomeSection() {
  return (
    <section className="...">
      <div className="max-w-[1100px] mx-auto px-[90px]">...</div>
    </section>
  );
}
```

```tsx
// Client component (interaktif)
"use client";
import { useState } from "react";
export default function SomeInteractive() {
  const [state, setState] = useState(initial);
  // ...
}
```

## Catatan

- Login page (`/login`) masih kosong — belum diimplementasi.
- Register page memiliki form validation client-side tetapi belum terhubung ke backend API.
- Data event di `EventCards.tsx` masih hardcoded — perlu dihubungkan ke API/database nantinya.
- Google OAuth button di register page dalam status `disabled` (belum terintegrasi).
