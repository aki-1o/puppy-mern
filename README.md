# Puppy E-Commerce & Adoption Platform Clone

> Full-stack clone of https://puppy.instabizweb.com/ — a responsive pet e-commerce & adoption landing page with a REST API backend, MongoDB database, and automated database asset management.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-yellow?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-black?logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-Mongoose-green?logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Live Demo:** [https://puppy-clone.vercel.app](https://puppy-clone.vercel.app) *(replace with your deployed URL)*

---

## Evaluation Context

This repository was created as a **full-stack technical cloning assignment for Insta Biz Web**. The goal was to reconstruct a fully responsive, performant, and interactive pet e-commerce landing page and catalog — matching [puppy.instabizweb.com](https://puppy.instabizweb.com/) — with backend API connectivity and automated database asset management, all within a **24-hour evaluation window**.

---

## Key Features

| Feature | Description |
|---|---|
| **Pixel-perfect responsive UI** | Mobile, tablet, and desktop layouts matching the target site. Built mobile-first with utility-first CSS. |
| **Dynamic Puppy Catalog & Filtering** | REST-powered catalog with breed, origin, gender, status, and pagination filters (`GET /api/puppies`). |
| **Database Asset Seeding** | `seed.js` populates puppies, family photos, FAQs, testimonials, and default picsum images with photographer credits. |
| **Interactive UI elements** | Mobile drawer navigation, form state validation, loading indicators, and image fallback handlers (`onError`). |
| **Photo & credit library** | Every picsum image is pinned to a stable ID, credited to the photographer, and listed on `/api/credits`. |
| **Admin image push** | `POST /api/images` (guarded by `x-admin-key`) lets you push new picsum photos and assign them to puppies or families. |

---

## Tech Stack Breakdown

| Layer | Technology | Purpose |
|---|---|---|
| **Front-end** | React 18, Vite, React Router DOM | Component-based UI, fast dev server, client-side routing |
| **Back-end** | Node.js, Express | REST API server, route handling, middleware |
| **Database** | MongoDB, Mongoose | Document storage for puppies, families, images, FAQs, enquiries |
| **Styling** | Tailwind CSS | Utility-first, responsive, mobile-first styling |
| **Assets** | Picsum Photos | Placeholder puppy/family photos with verified photographer credits |
| **Validation** | Zod | Schema validation for enquiry and image payloads |
| **Deployment** | Render (API) + Vercel (Client) | Production hosting for backend and frontend |

---

## Project Folder Structure

```
biscuit-pups/
├── client/                      # React + Vite frontend
│   ├── public/                  # Static assets (favicon, fallback images)
│   ├── src/
│   │   ├── components/          # Reusable UI components (Navbar, PuppyCard, InquiryForm, ...)
│   │   ├── pages/               # Route pages (Home, Puppies, PuppyDetail, Families, FAQ, Contact)
│   │   ├── App.jsx              # Route definitions
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js           # /api proxy → http://localhost:5000
│   └── tailwind.config.js
├── server/                      # Express + MongoDB backend
│   ├── data/
│   │   ├── images.json          # Default picsum image URLs with assignments
│   │   └── seed.json            # Puppies, families, FAQs, testimonials seed data
│   ├── lib/
│   │   ├── images.js            # pushImage(): resolve picsum URL, save with credit, assign target
│   │   └── picsum.js            # parsePicsumUrl(), resolvePicsum(): pin URL, lookup photographer
│   ├── models.js                # Mongoose schemas: Puppy, Family, Image, Faq, Testimonial, Enquiry
│   ├── routes.js                # Express router: /api/* endpoints
│   ├── index.js                 # App entry: middleware, mongoose connect, app.listen(:5000)
│   ├── push-images.js           # CLI script: push one or many picsum images to MongoDB
│   ├── seed.js                  # CLI script: reset DB and seed default data + photos
│   ├── .env.example             # Environment variable template
│   └── package.json
├── .gitignore
├── README.md
└── package.json (root, optional)
```

---

## Local Environment Setup & Run Guide

### Prerequisites

- **Node.js** >= 18 (see `server/package.json` engines)
- **npm** (bundled with Node)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI

### Step-by-Step

```bash
# 1) Clone the repository
git clone <your-repo-url>
cd biscuit-pups

# 2) Start MongoDB (Windows admin shell)
net start MongoDB
# or: mongod --dbpath C:\data\db
# Verify: mongosh

# 3) Set up the API server
cd server
cp .env.example .env
# Edit .env: set MONGODB_URI, PORT=5000, CORS_ORIGIN=http://localhost:5173, ADMIN_KEY=<optional>
npm install
npm run seed            # seeds puppies, families, FAQs, testimonial + 10 default photos with credits
npm run dev             # API on http://localhost:5000

# 4) Set up the client (new terminal)
cd client
cp .env.example .env    # optional; Vite proxies /api to :5000 in dev
npm install
npm run dev             # Client on http://localhost:5173
```

**What happens:** The Vite dev server proxies `/api` requests to `http://localhost:5000`, so the frontend talks to the Express API without CORS issues in development.

---

## API Endpoints Table

| Method | Endpoint | Request | Response | Description |
|---|---|---|---|---|
| `GET` | `/api/health` | — | `{ ok: true }` | Health check |
| `GET` | `/api/home` | — | `{ puppies, families, faqs, testimonial }` | One round-trip home page payload |
| `GET` | `/api/puppies` | `?breed,origin,gender,status,page,limit` | `{ items, total, page, pages }` | Filtered, paginated puppy catalog |
| `GET` | `/api/puppies/:slug` | — | Puppy object | Single puppy profile (404 if missing) |
| `GET` | `/api/families` | — | `[Family, ...]` | All family photos |
| `GET` | `/api/faqs` | — | `[Faq, ...]` | All FAQs |
| `GET` | `/api/credits` | — | `[Image, ...]` | Every photo with photographer credit |
| `POST` | `/api/enquiries` | `{ name, phone, email, city, message, puppySlug? }` | `{ ok: true }` | Zod-validated contact enquiry (honeypot + rate limit) |
| `POST` | `/api/images` | `x-admin-key` header + `{ url, alt?, assign? }` | Image document | Admin-guarded picsum image push |

*Security basics: helmet, CORS allow-list, 20kb body limit, string-coerced query values (NoSQL-injection guard), rate limiting.*

---

## Deployment & Performance

### Deployment Configuration

- **API (Render):** root directory `server/`; build command `npm install`; start command `npm start`. Environment variables: `MONGODB_URI` (Atlas), `CORS_ORIGIN` (your Vercel domain), `PORT`, `ADMIN_KEY`.
- **Client (Vercel):** root directory `client/`; framework preset `Vite`. Environment variable: `VITE_API_URL=https://<your-render-app>.onrender.com`. `vercel.json` rewrites handle React Router page refreshes.
- **MongoDB:** MongoDB Atlas (production) or local `mongod` (development).

### Performance Summary (Lighthouse target)

| Metric | Target |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |

*Note: Run `npm run build` in `client/` and audit the production build with Lighthouse in Chrome DevTools for real numbers.*

---

## License

MIT. Built as an evaluation assignment for Insta Biz Web. Placeholder brand; illustrations and picsum photos are stand-ins — replace with owned/licensed photography before production use.
