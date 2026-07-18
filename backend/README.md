# TicketTama Backend

Backend API untuk platform TicketTama. Saat ini menyediakan fitur autentikasi (register, login, logout, refresh, get me).

## Stack

- **Bahasa:** Go 1.22+
- **Framework:** Gin
- **ORM:** GORM
- **Database:** SQLite (file-based di `data/tickettama.db`)
- **Auth:** JWT (access + refresh token, refresh via httpOnly cookie)
- **Password:** bcrypt

## Struktur

```
backend/
├── cmd/server/         # Entry point
├── internal/
│   ├── config/         # Loader .env
│   ├── database/       # Setup GORM + auto-migrate
│   ├── models/         # Struct User
│   ├── repository/     # Query DB
│   ├── services/       # Business logic
│   ├── handlers/       # HTTP handler
│   ├── middleware/     # Auth + CORS
│   ├── utils/          # JWT + bcrypt helpers
│   └── dto/            # Request/Response shapes
├── data/               # File SQLite (gitignored)
├── .env.example
├── go.mod
└── README.md
```

## Setup

1. Pastikan Go 1.22+ dan GCC terinstall.
   - macOS: `brew install go` dan `xcode-select --install`
2. Copy `.env.example` ke `.env` dan generate JWT secret baru:
   ```bash
   cp .env.example .env
   openssl rand -hex 32   # jalankan 2x, replace JWT_ACCESS_SECRET & JWT_REFRESH_SECRET
   ```
3. Install dependencies & jalankan:
   ```bash
   go mod tidy
   go run ./cmd/server
   ```
4. Server berjalan di `http://localhost:8080`.

## API Endpoint

| Method | Path                  | Auth   | Keterangan                       |
|--------|-----------------------|--------|----------------------------------|
| POST   | `/api/auth/register`  | -      | Daftar akun baru                 |
| POST   | `/api/auth/login`     | -      | Masuk                            |
| POST   | `/api/auth/refresh`   | Cookie | Rotate access token              |
| POST   | `/api/auth/logout`    | -      | Hapus cookie refresh             |
| GET    | `/api/auth/me`        | Bearer | Ambil data user dari access token|
| GET    | `/api/health`         | -      | Health check                     |

## Skema Request/Response

### Register / Login

Request:
```json
{ "nama_lengkap": "Budi", "email": "budi@mail.com", "password": "secret123" }
```

Response sukses:
```json
{
  "user": { "id": 1, "nama_lengkap": "Budi", "email": "budi@mail.com" },
  "access_token": "eyJ..."
}
```

Refresh token di-set via httpOnly cookie `refresh_token`.
