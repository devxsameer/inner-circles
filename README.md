# InnerCircles

InnerCircles is a club-based social platform where users create private communities (“circles”), share posts, and experience **identity-aware privacy** — authors are visible only to members of the same circle and anonymous to everyone else.

This project started as _The Odin Project – Members Only_ assignment, but evolved into a **full-featured, production-style web application** with real authorization rules, role-based permissions, and relational data integrity.

---

## 🚀 Live Concept

> **See posts. Join circles. Speak freely.**
>
> In InnerCircles:
>
> - Anyone can read **public posts**
> - Only circle members can see **who wrote them**
> - Each circle governs its own members, roles, and content

---

## ✨ Key Features

### 🔐 Authentication & Sessions

- Username-password authentication using **Passport.js (Local Strategy)**
- Secure session handling with **PostgreSQL session store**
- Login rate-limiting to prevent brute-force attacks

### 🧑‍🤝‍🧑 Circles (Communities)

- Users can **create their own circles**
- Circle creator automatically becomes **owner**
- Role-based system:
  - **Owner** – full control
  - **Admin** – manage members & roles
  - **Member** – post and interact
- Owners & admins can:
  - Add members by username
  - Promote/demote members
  - Remove members (with strict rules)

### 📝 Posts & Privacy

- Posts belong to a specific circle
- Two visibility levels:
  - `public` – visible to everyone
  - `members_only` – visible only to circle members
- **Author anonymity logic**
  - Members see real usernames
  - Non-members see posts as _Anonymous_

### 🛡 Authorization & Security

- Policy-based permission system
- Loader middlewares (`loadPost`, `loadCircle`, `loadMembership`)
- Separation of concerns:
  - **Routes → Controllers → Services → Models**
- Business rules enforced at:
  - Service layer
  - Database constraints
  - PostgreSQL triggers

### 📊 Performance & UX

- Pagination for posts and circles
- Popular circles ranked by member count
- Indexed queries for efficient lookups
- Clean, responsive UI using **Tailwind CSS**

---

## 🧠 Architecture Overview

```bash
src/
├── routes/        # Route definitions
├── controllers/   # Request handling & view rendering
├── services/      # Business logic layer
├── models/        # Database queries & data access
├── policies/      # Permission & authorization rules
├── middlewares/   # Auth, loaders, validators
├── utils/         # Helpers, custom errors, pagination
├── views/         # Handlebars templates
└── database/      # PostgreSQL connection pool
```

---

## 🗄 Database Design

**Core tables**

- `users`
- `circles`
- `circle_members`
- `posts`

**Notable design choices**

- `members_count` cached on circles via PostgreSQL triggers
- Single owner enforced per circle
- Role constraints at DB level
- Automatic `edited_at` updates via trigger
- Defensive foreign keys with cascading deletes

---

## ⚙️ Tech Stack

### Backend

- **Node.js**
- **Express 5**
- **PostgreSQL**
- **Passport.js**
- **express-session**
- **bcrypt**

### Frontend

- **Handlebars**
- **Tailwind CSS**

### Tooling

- **pnpm**
- **nodemon**
- **dotenv**
- **connect-pg-simple**

---

## 🧪 Demo Data

The project includes realistic seed data:

- Multiple users
- Five circles with varied roles
- 20+ long-form posts
- Mixed visibility (public / members-only)

This makes the app immediately demo-ready.

---

## 🏃 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/devxsameer/inner-circles.git
cd inner-circles

```

### 2. Install dependencies

```bash
git clone https://github.com/devxsameer/inner-circles.git
cd inner-circles

```

### 3. Environment variables

Create a `.env` file

```env
DATABASE_URL=postgres://user:password@localhost:5432/inner_circles
SESSION_SECRET=supersecret
NODE_ENV=development
```

### 4. Initialize database

Run the SQL schema and seed file:

```bash
psql $DATABASE_URL -f sql/init.sql
```

### 5. Start development server

```bash
pnpm dev
```

App runs at:  
[👉 http://localhost:6969](http://localhost:6969)

---

## 🔑 Example Demo Accounts

> For demo/testing purposes only  
> (Passwords are intentionally identical in seed data)

| Username | Password |
| -------- | -------- |
| alice    | password |
| bob      | password |
| charlie  | password |

---

## 📌 Why This Project Matters

This project demonstrates:

- ✅ Real-world authorization logic
- ✅ Clean Express.js architecture
- ✅ Thoughtful database design
- ✅ Security-first mindset

---

## 🛣 Future Improvements

Planned enhancements include:

- 🔐 CSRF protection
- 🔑 OAuth login (Google / GitHub)
- 💬 Comment threads
- 🔔 Notifications system
- 🌐 Full REST / JSON API mode

---

## 📜 License

This project is licensed under the **ISC License**.

---

## 🙌 Acknowledgements

Inspired by **The Odin Project**,  
expanded with production-style architecture, strict permissions,
and real privacy rules.

---
