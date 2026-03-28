# Appscrip task — Shivakumar Bojanapu

Product Listing Page (PLP) built with **Next.js (App Router)** and **React**. The home route is **server-rendered on each request (SSR)**: products are fetched on the server from the [Fake Store API](https://fakestoreapi.com/) with `cache: 'no-store'`, and the page is marked `dynamic = 'force-dynamic'`.

## Features

- Semantic layout (`header`, `main`, `footer`, `nav`, `section`, `article`, `aside`, `fieldset`)
- SEO: metadata (title, description, Open Graph), visible **H1** / **H2** hierarchy, **JSON-LD** `ItemList` + `Product` schema
- Accessible product images with descriptive **alt** text; `data-seo-name` carries a slug derived from the title for traceability
- Responsive CSS (desktop grid, tablet 2 columns, mobile 1 column) — no CSS framework
- Client-side search, category filters, and max-price range with minimal interactive surface

## Scripts

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm start      # production server after build
npm run lint
```

## Deploy on Netlify

1. Push this repo to a public GitHub repository named `Appscrip-task-Shivakumar-Bojanapu` (or your candidate name variant).
2. In [Netlify](https://www.netlify.com/), create a site from the repo.
3. Build command: `npm run build`. The repo includes `netlify.toml` with `@netlify/plugin-nextjs` for the Next.js runtime.

## Stack

- Next.js 15, React 19
- Dependencies: `next`, `react`, `react-dom` only (no Axios — native `fetch`)
