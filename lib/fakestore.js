const DEFAULT_PRODUCTS_URL = 'https://fakestoreapi.com/products';
const FALLBACK_PRODUCTS_URL = 'https://dummyjson.com/products?limit=200';

/** Cloudflare and some CDNs return 403 for serverless fetches with a bare Node UA — mimic a browser. */
const OUTBOUND_HEADERS = {
  Accept: 'application/json',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Referer: 'https://fakestoreapi.com/',
};

function normalizeDummyJsonProduct(p) {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.thumbnail || p.images?.[0] || '',
    rating: {
      rate: typeof p.rating === 'number' ? p.rating : 0,
      count: Array.isArray(p.reviews) ? p.reviews.length : p.stock ?? 0,
    },
  };
}

export async function getProducts() {
  const customUrl = process.env.PRODUCTS_API_URL?.trim();
  const primaryUrl = customUrl || DEFAULT_PRODUCTS_URL;

  const res = await fetch(primaryUrl, {
    cache: 'no-store',
    headers: OUTBOUND_HEADERS,
  });

  if (res.ok) {
    return res.json();
  }

  if (customUrl) {
    throw new Error(`Products request failed: ${res.status}`);
  }

  const fb = await fetch(FALLBACK_PRODUCTS_URL, {
    cache: 'no-store',
    headers: OUTBOUND_HEADERS,
  });
  if (!fb.ok) {
    throw new Error(`Products request failed: ${res.status} (fallback: ${fb.status})`);
  }
  const data = await fb.json();
  const list = data.products ?? [];
  return list.map(normalizeDummyJsonProduct);
}

export function buildItemListSchema(products) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Product catalog',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.title,
        description: p.description,
        image: p.image,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: String(p.price),
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
}
