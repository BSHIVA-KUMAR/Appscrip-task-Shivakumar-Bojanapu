'use client';

import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <p className="plp-empty" role="status">
        No products match your filters. Try clearing categories or raising the max
        price.
      </p>
    );
  }

  return (
    <ul className="plp-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
