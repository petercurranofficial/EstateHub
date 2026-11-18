# EstateHub – Real Estate Property Listing Platform

## Overview
EstateHub is a full‑stack, responsive real‑estate web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, and **PostgreSQL**. It provides public property browsing, advanced search & filters, detailed property pages, a blog, and a secure **admin dashboard** for managing listings, agents, enquiries, and site content.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup & Migrations](#database-setup--migrations)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Deploying to Vercel](#deploying-to-vercel)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features
- **Public site**: Home, property listings (Buy/Rent/Commercial), property detail pages, agents, blog, static legal pages.
- **Search & Filters**: Location, type, price range, bedrooms, bathrooms, area, furnishing, status.
- **Admin Dashboard**: Manage properties, images, agents, enquiries, blog posts, website settings.
- **Authentication**: Credential‑based admin login using **next‑auth** with role‑based access control.
- **Image storage**: Integration with Cloudinary (or any compatible CDN).
- **SEO**: Friendly URLs, meta tags, Open Graph, sitemap, robots.txt, structured data.
- **Responsive Design**: Tailwind‑based UI works on desktop, tablet, and mobile.
- **Testing**: Jest + React Testing Library unit tests, Playwright end‑to‑end scaffolding.
- **CI/CD**: GitHub Actions workflow for lint, test, build, and Vercel preview deployments.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide‑React |
| **Backend / API** | Next.js API routes, Node.js |
| **Database** | PostgreSQL (managed), Prisma ORM |
| **Auth** | next‑auth (Credentials provider) |
| **Image storage** | Cloudinary (or compatible) |
| **Deployment** | Vercel (frontend) + managed PostgreSQL |
| **Testing** | Jest, React Testing Library, Playwright |
| **CI** | GitHub Actions |

---

## Getting Started
### Prerequisites
- **Node.js** ≥ 20.x (recommended) 
- **pnpm** or **npm** (this repo uses npm scripts)
- A PostgreSQL database (local Docker or cloud provider)
- Cloudinary account (or compatible image service)

### 1. Clone the repository
```bash
git clone <repo‑url>
cd estatehub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy the example file and fill in your values:
```bash
cp .env.example .env.local
# edit .env.local with your credentials
```

### 4. Initialize the database
```bash
npm run prisma:migrate   # creates tables
npm run prisma:seed      # optional seed data
```

### 5. Run the development server
```bash
npm run dev
```
Open **http://localhost:3000** in a browser.

---

## Environment Variables
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (e.g., `postgresql://user:pass@host:5432/estatehub`) |
| `NEXTAUTH_SECRET` | Random secret used by next‑auth for JWT signing |
| `NEXTAUTH_URL` | URL of the running app (e.g., `http://localhost:3000`) |
| `ADMIN_EMAIL` | Email used for the initial admin account |
| `ADMIN_PASSWORD` | Password for the initial admin account (hashed on first login) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site (used for sitemap, OG tags) |

---

## Database Setup & Migrations
The Prisma schema lives in `prisma/schema.prisma`. After editing the schema:
```bash
npm run prisma:generate   # generate client
npm run prisma:migrate     # apply migration
```

You can also reset the DB (development only):
```bash
npm run prisma:migrate:reset
```

---

## Building for Production
```bash
npm run build   # creates .next output
npm start       # runs the production server locally
```

---

## Deploying to Vercel
1. Push the repository to GitHub.
2. Connect the repo in the Vercel dashboard.
3. Add the environment variables listed above in Vercel > Settings > Environment Variables.
4. Vercel will automatically run `npm install && npm run build` on each push.
5. Set the **Production Branch** (usually `main`).

---

## Testing
### Unit Tests
```bash
npm run test   # runs Jest
```

### End‑to‑End Tests (Playwright)
```bash
npx playwright test   # runs e2e suite against the dev server
```

---

## Project Structure (high‑level)
```
├─ app/                       # Next 14 App Router pages
│   ├─ layout.tsx            # Root layout
│   ├─ page.tsx              # Home page (public)
│   ├─ buy/…                 # Buy listings
│   ├─ rent/…                # Rent listings
│   ├─ commercial/…          # Commercial listings
│   ├─ property/[slug]/…      # Property detail page
│   ├─ agents/…              # Agent list & profile pages
│   ├─ blog/…                # Blog list & article pages
│   ├─ admin/…               # Protected admin UI (dashboard, CRUD)
│   └─ … (legal pages, 404, etc.)
├─ components/                # Re‑usable UI components
│   ├─ Header.tsx
│   ├─ Footer.tsx
│   ├─ PropertyCard.tsx
│   └─ …
├─ lib/                       # Helpers (prisma client, cloudinary, auth utilities)
├─ prisma/                    # Prisma schema & seed script
├─ public/                    # Static assets (favicon, images)
├─ styles/                    # globals.css (Tailwind import)
├─ .eslintrc.json
├─ .gitignore
├─ jest.config.js
├─ next.config.js
├─ package.json
└─ README.md
```

---

## License
MIT © 2026 EstateHub contributors
