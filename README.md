# InnerCircles

### _Private communities. Real conversations. Public anonymity._

Node • Express • PostgreSQL • Passport • Tailwind

**InnerCircles** is a modern, community-based social platform where users can:

- Create and join private circles
- Post publicly or privately
- Reveal identities **only within their circles**
- Manage members with strict **role-based permissions**

It blends privacy, collaboration, and anonymity into a clean, simple user experience — making it a portfolio-grade full-stack project.

This project emphasizes **authorization modeling, privacy boundaries, and relational integrity** over UI complexity.

This project started as _The Odin Project – Members Only_ assignment, but evolved into a **full-featured, production-style web application** with real authorization rules, role-based permissions, and relational data integrity.

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-Authenticated-34E27A?logo=passport&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?logo=tailwindcss)

---

## 🚀 Live Preview

🔗 **Live App:**  
👉 [**https://innercircles.devxsameer.me/**](https://innercircles.devxsameer.me/)

Hosted on **Render** + **Neon PostgreSQL**.

> Note: First visit may take a few seconds if Render has spun down the instance.

---

## 🚀 Live Concept

InnerCircles enforces **context-aware identity visibility**:

- Public posts hide author identity
- Circle members see real usernames
- Access rules are enforced consistently at route, service, and database levels

---

## ✨ Key Features

### 🔐 Authentication

- Local auth using **Passport.js**
- Session-based login with PostgreSQL session store
- **Bcrypt** password hashing
- Rate-limited login endpoint (secure for production)

> This project intentionally uses **session-based authentication** to demonstrate traditional server-rendered auth flows, secure session storage, and Passport.js integration.

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
- SQL triggers keep `members_count` up to date automatically

### 📝 Posts & Privacy

- Create, edit, and delete posts inside circles
- Visibility types:
  - `public`
  - `members_only`
- Identity reveal is circle-based:
  - Outside → **Anonymous**
  - Inside → **Real username**
- Pagination for all feeds

### 🛡 Authorization & Security

- Policy-based permission system
- Loader middlewares (`loadPost`, `loadCircle`, `loadMembership`)
- Separation of concerns:
  - **Routes → Controllers → Services → Models**
- Business rules enforced across:
  - Route-level permission checks
  - Service-layer validation
  - Database constraints & triggers

### 📊 Performance & UX

- Viewer-aware SQL queries to avoid leaking member-only content
- Pagination for posts and circles
- Popular circles ranked by member count
- Indexed queries for efficient lookups
- Clean, responsive UI using **Tailwind CSS**

### 🏠 Homepage

- Latest public posts
- Most popular circles
- Clean, Tailwind-powered design

---

## 📌 Why This Project Matters

This project demonstrates:

- Real-world authorization complexity (not just auth)
- Privacy-first content visibility
- Clean Express architecture with clear responsibility boundaries
- Defensive database design with constraints and triggers

---

## 📸 Screenshots

**Home Page**

![Home Page Screenshot](./public/screenshots/home_sc.png)

**Circle Details Page**

![Circle Details Page Screenshot](./public/screenshots/circle_details_sc.png)

**Manage Circle Page**

![Manage Circle Page Screenshot](./public/screenshots/manage_circle_sc.png)

**All Posts Page**

![All Posts Page Screenshot](./public/screenshots/all_posts_sc.png)

**Create Post Page**

![Create Post Page Screenshot](./public/screenshots/create_post_sc.png)

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
- **PostgreSQL (Neon)**
- **Passport.js (local strategy)**
- **express-session**
- **bcrypt**
- **connect-pg-simple (session store)**

### Frontend

- **Handlebars**
- **Tailwind CSS**

### Tooling

- **pnpm**
- **nodemon**
- **dotenv**
- **Concurrently**

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
pnpm install

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

## 🛣 Future Improvements

> This project is feature-complete. The items below reflect potential extensions rather than an active roadmap.

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

## 👨‍💻 Author

### **Sameer Ali**

**Backend-focused Full-Stack Developer**  
Interested in authorization systems, backend architecture, and scalable web applications

Passionate about crafting clean, scalable applications and building community-based platforms.  
Focused on JavaScript, Node.js, and modern full-stack development.

### 🌍 **Links**

- 🌐 **Portfolio:** [https://devxsameer.me](https://devxsameer.me)
- 💼 **LinkedIn:** [https://www.linkedin.com/in/devxsameer/](https://www.linkedin.com/in/devxsameer/)
- 🐦 **Twitter (X):** [https://x.com/devxsameer](https://x.com/devxsameer)
- 💻 **GitHub:** [https://github.com/devxsameer](https://github.com/devxsameer)

---

If you like this project:

#### 👉 Give it a star on GitHub! ⭐

It truly helps!

---
