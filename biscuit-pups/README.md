# Biscuit Pups — MERN demo site

MongoDB · Express · React (Vite) · Node. A multi-page miniature-puppy shop: home, puppies (filters + detail), happy families,
how it works, FAQ and a "letter" contact form, backed by a real API and database.

This is a demo build. The brand is a placeholder, the puppies are illustrations, and the testimonial is sample text.
Contact details live in one file: `client/src/config.js`.

## Run it

MongoDB must be running first (Windows: `net start MongoDB` in an admin shell, or `mongod --dbpath C:\data\db`). Check with `mongosh`.

```bash
# 1) API
cd server
cp .env.example .env        # set MONGODB_URI (local Mongo or Atlas)
npm install
npm run seed                # puppies, 12 family cards, FAQs, testimonial + default photos with credits (needs internet for credits)
npm run dev                 # http://localhost:5000

# 2) Client (new terminal)
cd client
cp .env.example .env        # optional in dev: Vite proxies /api to :5000
npm install
npm run dev                 # http://localhost:5173
```

## Pages

| Route | What |
|---|---|
| `/` | hero, meet the pups, two ways, journey, trust passport, families, FAQ, CTA |
| `/puppies` | filters (showroom / imported, breed, boy / girl) via query string |
| `/puppies/:slug` | puppy profile + enquiry form |
| `/happy-families` | polaroid wall + testimonial |
| `/how-it-works` | two-ways toggle, promise, delivery, why choose us |
| `/faq` | searchable board of notes |
| `/contact` | letter-style form, contact details |

Hover any puppy (cards, hero line-up, polaroids, profile): its eyes shut and its tail wags harder (`index.css`, `PuppyArt.jsx`).
The WhatsApp buttons are intentionally inert (`components/WhatsAppButton.jsx`).

## API

| Method | Route | Notes |
|---|---|---|
| GET | `/api/home` | puppies + families + 3 FAQs + testimonial in one round-trip |
| GET | `/api/puppies` | `?breed=&origin=local\|imported&gender=boy\|girl&status=&page=&limit=` |
| GET | `/api/puppies/:slug` | single puppy, 404 if missing |
| GET | `/api/families`, `/api/faqs` | |
| GET | `/api/credits` | every photo in the database with its photographer credit |
| POST | `/api/images` | `x-admin-key` header = `ADMIN_KEY`. Body `{ url, alt?, assign? }` pushes a picsum image (see below) |
| POST | `/api/enquiries` | zod-validated, honeypot field, 8/hour/IP rate limit |

Security basics: helmet, CORS allow-list, body-size limit, query values coerced to strings (no `?breed[$ne]=` injection).

## Photos & credits (Picsum placeholders)

Picsum photos are **random Unsplash images, not puppies**. They're stand-ins so you can see how real photos will look.
Every one is credited: the photographer is looked up from `picsum.photos/id/<id>/info`, stored with the image, shown under the
photo on puppy pages and polaroids, and listed on `/credits` (linked in the footer).

- **Defaults:** `server/data/images.json` lists the URLs (all forms work: `/200/300`, `/seed/puppy/400/300`, `?grayscale`, `/id/237/...`).
  `npm run seed` pushes them and assigns each to a puppy (`puppy:max`) or a family polaroid (`family:3`). Puppies not listed keep their illustration.
- **Random URLs get pinned** to the image they return, so a photo never changes on refresh. Sizes in the URL are replaced with sizes that fit the site.
- **Push more from the terminal:** `npm run images -- https://picsum.photos/seed/bella/400/300 --assign puppy:honey --alt "Honey"`
  (or `npm run images` to re-push everything in `images.json`).
- **Push over the API:** set `ADMIN_KEY` in `server/.env`, then
  `curl -X POST localhost:5000/api/images -H "content-type: application/json" -H "x-admin-key: $ADMIN_KEY" -d '{"url":"https://picsum.photos/200/300","assign":"puppy:mochi"}'`
- Only `https://picsum.photos` URLs are accepted. Re-running `npm run seed` resets puppies, so re-push custom assignments afterwards.
- Offline? Seeding still works with seed/id URLs, but photographers show as "unverified" until you seed again online.

For real photos of your own puppies, set `image` (and optionally `credit`) on the record. Only use photos you own or have a licence for.

## Deploy (Atlas + Render + Vercel)

- **API → Render:** root `server`, build `npm install`, start `npm start`. Env: `MONGODB_URI`, `CORS_ORIGIN=https://<your-vercel-app>.vercel.app`.
- **Client → Vercel:** root `client`, env `VITE_API_URL=https://<your-render-app>.onrender.com`. `vercel.json` handles React Router refreshes.
