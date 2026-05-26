# 📚 Book Management System

<div align="center">

## Modern Full-Stack Book Management Platform

A beautifully crafted **Book Management System** built using **Next.js 15**, **TypeScript**, **Prisma**, **PostgreSQL**, and **Tailwind CSS** — designed with performance, scalability, and premium user experience in mind.

Manage your personal library with a sleek UI, powerful CRUD operations, search & filtering, smooth animations, and production-ready architecture.

<br />

[🚀 Live Demo](YOUR_VERCEL_LINK_HERE) • [💻 GitHub Repository](https://github.com/thisisfaizanali/nxg-assignment)

</div>

---

# ✨ Features

## 📖 Book Management

- Add new books
- Edit existing books
- Delete books
- View complete book collection

## 🔍 Smart Search & Filtering

- Search books by title or author
- Filter books by genre
- Instant UI updates

## 🎨 Premium User Experience

- Fully responsive modern UI
- Smooth animations with Framer Motion
- Beautiful toast notifications
- Elegant loading states
- Clean component architecture
- Optimized performance

## ⚡ Developer Experience

- Type-safe codebase with TypeScript
- Prisma ORM integration
- Modular project structure
- Scalable API architecture
- Easy environment setup

---

# 🛠️ Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Sonner

## Backend

- Next.js API Routes
- Prisma ORM

## Database

- PostgreSQL

## Deployment

- Vercel

---

# 📂 Project Structure

```bash
src/
│
├── app/
│   ├── api/
│   │   └── books/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│
├── lib/
│   └── prisma.ts
│
├── types/
│   └── book.ts
│
└── styles/
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/thisisfaizanali/nxg-assignment.git
```

---

## 2️⃣ Navigate to the Project

```bash
cd nxg-assignment
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_postgresql_database_url"
```

---

## 5️⃣ Setup Prisma

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

---

## 6️⃣ Start Development Server

```bash
npm run dev
```

Application will run at:

```bash
http://localhost:3000
```

---

# 📡 API Endpoints

## Get All Books

```http
GET /api/books
```

---

## Add New Book

```http
POST /api/books
```

### Request Body

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self Help",
  "year": 2018
}
```

---

## Update Book

```http
PUT /api/books/:id
```

---

## Delete Book

```http
DELETE /api/books/:id
```

---

# 🧠 Design Highlights

- Minimal & clean interface
- Smooth micro-interactions
- Optimized responsive layouts
- Modern typography & spacing
- Production-ready architecture

---

# 📸 Screenshots

## Dashboard

> Add your application screenshots here

---

# 🔮 Future Improvements

- 🔐 Authentication & Authorization
- 🌙 Dark / Light Theme
- 📚 Pagination & Sorting
- 🖼️ Book Cover Upload
- ⭐ Favorites & Ratings
- 🧠 Advanced Filtering
- ☁️ Cloud Storage Integration

---

# 📦 Production Build

```bash
npm run build
```

---
