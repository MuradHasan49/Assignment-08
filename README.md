# TileVerse — Tiles Gallery

> A premium tile showcase gallery built with **Next.js 15**, **HeroUI**, **BetterAuth**, and **MongoDB**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000?style=for-the-badge&logo=vercel)](https://your-live-url.vercel.app)

---

## 📋 Project Purpose

TileVerse is a beautifully designed tile gallery web application where users can discover and explore premium tiles for their home renovation or interior design projects. It features authentication, a searchable tile gallery, detailed tile views, and user profile management.

---

## ✨ Key Features

- 🏠 **Hero Section** — Swiper.js auto-playing carousel with 3 featured slides
- 📜 **Marquee** — Scrolling new arrivals and feature announcements
- 🔲 **Category Filters** — Filter tiles by ceramic, marble, mosaic, and more
- 🔍 **Live Search** — Real-time search on the All Tiles page
- 🔐 **Authentication** — Email/password + Google OAuth via BetterAuth
- 👤 **User Profiles** — View and update name & avatar
- 🔒 **Route Protection** — Middleware guards for `/tile/*` and `/my-profile/*`
- 📱 **Fully Responsive** — Mobile, tablet, and desktop support
- ⚡ **Skeleton Loading** — Smooth loading states for all data fetching
- 🌐 **Custom 404** — Branded not-found page
- 🎨 **Dark Mode Design** — Glassmorphism, gradients, and micro-animations

---

## 🚀 Live URL

🔗 [https://your-live-url.vercel.app](https://your-live-url.vercel.app)

---

## 🛠️ npm Packages Used

| Package | Purpose |
|---|---|
| `next` | Next.js 15 App Router framework |
| `@heroui/react` | HeroUI component library |
| `better-auth` | Authentication (email/password + Google OAuth) |
| `mongodb` | MongoDB driver for database |
| `mongoose` | MongoDB ODM |
| `swiper` | Swiper.js carousel for hero section |
| `react-fast-marquee` | Scrolling marquee component |
| `framer-motion` | Animation library (bundled with HeroUI) |
| `react-hot-toast` | Toast notifications |
| `axios` | HTTP client |
| `@iconify/react` | 100k+ icon library |
| `json-server` | Mock REST API for tiles data |
| `tailwindcss` | Utility-first CSS framework |

---

## 🗂️ Route Structure

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page with hero, marquee, featured tiles |
| `/all-tiles` | Public | Full tile gallery with search & filter |
| `/tile/[id]` | 🔒 Private | Detailed single tile view |
| `/login` | Public | Email/Google login |
| `/register` | Public | User registration |
| `/my-profile` | 🔒 Private | User profile display |
| `/my-profile/update` | 🔒 Private | Update name & avatar |

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key_min_32_chars
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_JSON_SERVER_URL=http://localhost:5000
```

---

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Start JSON server (in a separate terminal)
npm run server

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and [http://localhost:5000](http://localhost:5000) for the API.

---

## 📦 Deployment

Deployed on **Vercel**. For JSON server, deploy to **Render** (free tier):

1. Push `json-server/db.json` to a GitHub repo
2. Create a Render Web Service pointing to it
3. Update `NEXT_PUBLIC_JSON_SERVER_URL` in Vercel environment variables

---

## 👨‍💻 Author

Built with ❤️ for PH Assignment 08
