# TileVerse — Tiles Gallery

> A premium tile showcase gallery built with **Next.js 16**, **HeroUI**, **BetterAuth**, and **MongoDB**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000?style=for-the-badge&logo=vercel)](https://assignment-08-kappa-liart.vercel.app/)
[![JSON Server](https://img.shields.io/badge/JSON%20Server-Render-46E3B7?style=for-the-badge&logo=render)](https://assignment-08-json-server.onrender.com/tiles)

---

## 📋 Project Purpose

TileVerse is a beautifully designed tile gallery web application where users can discover and explore premium tiles for their home renovation or interior design projects. It features authentication, a searchable tile gallery, detailed tile views, and user profile management.

---

## ✨ Key Features

- 🏠 **Hero Section** — Swiper.js auto-playing carousel with featured slides
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

## 🚀 Live URLs

| Service | URL |
|---|---|
| 🌐 **Live App** | [https://assignment-08-kappa-liart.vercel.app/](https://assignment-08-kappa-liart.vercel.app/) |
| 🗄️ **JSON Server API** | [https://assignment-08-json-server.onrender.com/tiles](https://assignment-08-json-server.onrender.com/tiles) |

---

## 🛠️ npm Packages Used

| Package | Version | Purpose |
|---|---|---|
| `next` | `16.2.6` | Next.js App Router framework |
| `react` | `19.2.4` | Core UI library |
| `react-dom` | `19.2.4` | DOM rendering for React |
| `@heroui/react` | `^3.0.4` | HeroUI component library |
| `@heroui/styles` | `^3.0.4` | HeroUI design tokens & styles |
| `better-auth` | `^1.6.10` | Authentication (email/password + Google OAuth) |
| `mongodb` | `^7.2.0` | MongoDB driver for database |
| `mongoose` | `^9.6.2` | MongoDB ODM |
| `swiper` | `^12.1.4` | Swiper.js carousel for hero section |
| `react-fast-marquee` | `^1.6.5` | Scrolling marquee component |
| `framer-motion` | `^12.38.0` | Animation library |
| `react-hot-toast` | `^2.6.0` | Toast notifications |
| `axios` | `^1.16.0` | HTTP client |
| `@iconify/react` | `^6.0.2` | 100k+ icon library |
| `tailwindcss` | `^4` | Utility-first CSS framework *(devDependency)* |
| `json-server` | `^1.0.0-beta.15` | Mock REST API for tiles data *(devDependency)* |

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
| `/api/auth/[...all]` | Internal | BetterAuth handler (catch-all) |
| `/api/verify-session` | Internal | Server-side session verification |

---

## 📂 Folder Structure

```plaintext
Assignment-08/
├── public/                        # Static assets (SVGs, icons)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── all-tiles/             # Tile gallery with search & filter
│   │   ├── api/                   # API Route Handlers
│   │   │   ├── auth/
│   │   │   │   └── [...all]/      # BetterAuth catch-all handler
│   │   │   └── verify-session/    # Session verification endpoint
│   │   ├── login/                 # Sign in page
│   │   ├── my-profile/            # User profile page
│   │   │   └── update/            # Profile update form
│   │   ├── register/              # User registration page
│   │   ├── tile/
│   │   │   └── [id]/              # Dynamic tile detail page
│   │   ├── favicon.ico
│   │   ├── layout.js              # Root layout (Providers, Navbar, Footer)
│   │   ├── not-found.js           # Custom 404 page
│   │   └── page.js                # Homepage (Hero, Marquee, Tiles)
│   ├── components/                # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── TileCard.jsx
│   │   └── TileCardSkeleton.jsx
│   ├── lib/                       # Shared utilities & data layer
│   │   ├── api.js                 # Axios instance & tile API calls
│   │   ├── auth-client.js         # BetterAuth client-side instance
│   │   ├── auth.js                # BetterAuth server-side config
│   │   └── db.js                  # MongoDB / Mongoose connection
│   ├── globals.css                # Global Tailwind CSS styles
│   └── middleware.js              # Edge-runtime auth guard
├── .env.local                     # Environment credentials (not committed)
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs                # Next.js configuration
├── package.json
└── postcss.config.mjs
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key_min_32_chars
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_JSON_SERVER_URL=https://assignment-08-json-server.onrender.com
```

> **Note:** For local development you can point `NEXT_PUBLIC_JSON_SERVER_URL` to `http://localhost:5000` while running the local JSON server.

---

## 🏃 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/MuradHasan49/Assignment-08.git
cd Assignment-08

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Copy the example above into .env.local and fill in your values

# 4. (Optional) Start local JSON server in a separate terminal
npm run server          # runs on http://localhost:5000

# 5. Start the development server
npm run dev             # runs on http://localhost:3000

# Or run both simultaneously:
npm run dev:all
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment

| Service | Platform | Notes |
|---|---|---|
| **Frontend** | [Vercel](https://vercel.com) | Auto-deploy from `main` branch |
| **JSON Server API** | [Render](https://render.com) | Free-tier Web Service |

### Deploy JSON Server to Render

1. Push your `json-server/db.json` to a GitHub repository
2. Create a **Render Web Service** pointing to that repo
3. Set the start command: `npx json-server --watch db.json --port 5000`
4. Copy the Render URL and set it as `NEXT_PUBLIC_JSON_SERVER_URL` in your Vercel environment variables

---

## 👨‍💻 Author

Built with ❤️ for **PH Assignment 08** by [Murad Hasan](https://github.com/MuradHasan49)
