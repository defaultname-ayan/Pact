# Pact

> A commitment & accountability platform where goals have real stakes.

Pact helps users stay accountable by creating commitment contracts with friends, money stakes, forfeits, public accountability, and proof verification.

Built with a production-grade full-stack architecture using modern industry tooling.

---

# ✨ Features

- 🔐 JWT Authentication
- 👥 Partner-based accountability system
- 📜 Pact lifecycle state machine
- 📸 Proof / evidence submission
- ⚡ Real-time notifications with SSE
- 💸 Money stake support
- 🧠 Production-grade backend architecture
- 📊 User stats & completion tracking
- 🌐 Public accountability feed
- 🛡️ Type-safe full-stack codebase

---

# 🏗️ Architecture

```txt
Frontend (Next.js)
        ↓
Express API Server
        ↓
Service Layer
        ↓
Prisma ORM
        ↓
PostgreSQL
```

---

# 🛠️ Tech Stack

## Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand
- TanStack Query
- React Hook Form
- Zod
- shadcn/ui

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- Zod Validation

---

## Infrastructure

- Railway
- Vercel
- Cloudinary
- Resend
- Razorpay

---

# 📂 Project Structure

```txt
PACT/
├── frontend/
│
└── backend/
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── services/
    │   ├── middleware/
    │   ├── schemas/
    │   ├── lib/
    │   ├── types/
    │   └── jobs/
    │
    └── prisma/
```

---

# 🔐 Authentication Flow

```txt
User Login
    ↓
Password Verification
    ↓
JWT Generated
    ↓
Token Sent To Client
    ↓
Protected Routes Use Middleware
```

---

# 🧠 Core System Design

Pact is built around a strict state-transition architecture.

Every major action goes through a centralized transition service.

```txt
PENDING
   ↓
ACTIVE
   ↓
PENDING_VERIFY
   ↓
COMPLETED / FAILED
```

This ensures:

- predictable state changes
- atomic updates
- scalable business logic
- easier debugging
- production-grade maintainability

---

# ⚡ Real-Time Notifications

Uses native Server-Sent Events (SSE) instead of WebSockets.

```txt
Client opens notification stream
        ↓
Server stores active connection
        ↓
Events pushed instantly
```

No third-party realtime service required.

---

# 🗃️ Database Models

Core entities:

- User
- Pact
- Evidence
- Notification
- RefreshToken

---

# 🚀 Local Development

## Clone Repository

```bash
git clone <repo-url>
cd pact
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
DATABASE_URL=
JWT_SECRET=
```

Run migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 📡 API Routes

## Auth

```txt
POST /auth/register
POST /auth/login
GET  /auth/me
```

---

## Pacts

```txt
POST   /pacts
GET    /pacts
GET    /pacts/:id
PATCH  /pacts/:id
DELETE /pacts/:id
```

---

## Evidence

```txt
POST /pacts/:id/evidence
GET  /pacts/:id/evidence
```

---

# 🔒 Security

- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Zod request validation
- Type-safe backend
- Prisma ORM protection against SQL injection

---

# 📈 Future Improvements

- Refresh token rotation
- OAuth login
- Mobile app
- AI accountability coach
- Habit analytics
- Social graph
- Push notifications

---

# 🧪 Current Status

```txt
✅ Backend auth system complete
✅ PostgreSQL + Prisma setup
✅ JWT middleware
🚧 Frontend integration in progress
🚧 Pact lifecycle system
🚧 Realtime notifications
🚧 Payments integration
```

---

# 💡 Inspiration

Pact combines ideas from:

- Beeminder
- StickK
- Duolingo streak pressure
- Accountability partnerships
- Social commitment psychology

---

# 👨‍💻 Author

Built by aya mo.

Full-stack project focused on:

- scalable architecture
- real-world backend patterns
- modern React ecosystem
- production-grade systems design

---

# ⭐ Philosophy

> Motivation fades.
>
> Stakes create action.
>
> Pact makes goals costly to ignore.
