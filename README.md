# Product listing page — Appscrip task

A shop-style product listing built with Next.js. Product data comes from the public Fake Store API.

---

## Clone the repo

```bash
git clone https://github.com/Shivakumar-Bojanapu/Appscrip-task-Shivakumar-Bojanapu.git
cd Appscrip-task-Shivakumar-Bojanapu
```

*(If your GitHub URL is different, use your own clone link instead.)*

---

## Install

You need **Node.js** installed (version 18 or newer is fine).

```bash
npm install
```

That downloads everything listed in `package.json` (mainly Next.js and React).

---

## Tech used

- **Next.js** (App Router) — pages and server-side fetch  
- **React** — UI  
- **Plain CSS** — styling in `app/globals.css`  
- **Fake Store API** — product list over the internet  

---

## Run the app

**While developing** (saves files and refreshes the browser):

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

**Production-style run** (after a full build):

```bash
npm run build
npm start
```

Again, the site is at **http://localhost:3000** (unless your terminal says another port).

---

## Links

| | |
|--|--|
| **GitHub** | https://github.com/Shivakumar-Bojanapu/Appscrip-task-Shivakumar-Bojanapu |
| **Netlify (live site)** | https://appscrip-task-shivakumar-bojanapu.netlify.app |

If your repository or Netlify site uses another name, update the table above so the links match your real URLs.

---

## API / Netlify 403

Products are loaded on the **server** (not in the browser), so **CORS is not the issue**. A **403** from Fake Store on Netlify is often fixed by sending a normal **browser `User-Agent`** (already done in `lib/fakestore.js`). If the primary API still blocks your host, the app **falls back** to [DummyJSON](https://dummyjson.com/docs/products) and maps items to the same shape.

Optional: set **`PRODUCTS_API_URL`** in Netlify → Site configuration → Environment variables to your own JSON products URL (must return the same shape as Fake Store’s `/products` array).
