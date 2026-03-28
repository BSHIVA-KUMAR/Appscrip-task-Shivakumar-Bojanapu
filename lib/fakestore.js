const PRODUCTS_URL = 'https://fakestoreapi.com/products';

export async function getProducts() {
  const res = await fetch(PRODUCTS_URL, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Products request failed: ${res.status}`);
  }
  return res.json();
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
