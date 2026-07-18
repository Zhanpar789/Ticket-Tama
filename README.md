# TicketTama

Platform jual tiket event digital berbahasa Indonesia.

Repository ini adalah **monorepo** yang berisi 2 service terpisah:

| Folder       | Stack                          | Port              |
|--------------|--------------------------------|-------------------|
| `frontend/`  | Next.js 16 (App Router) + TS   | `http://localhost:3000` |
| `backend/`   | Go + Gin + GORM + SQLite       | `http://localhost:8080` |

## Cara Menjalankan (Development)

Buka **2 terminal** terpisah:

**Terminal 1 — Backend:**
```bash
cd backend
cp .env.example .env
# edit .env, generate JWT secret: openssl rand -hex 32
go run ./cmd/server
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

## Struktur Singkat

```
Website-TicketTama/
├── frontend/   # Next.js 16
├── backend/    # Go service (auth API)
└── agents.md   # Panduan untuk AI assistant
```

Detail lebih lengkap lihat `agents.md` di root dan `backend/README.md`.
