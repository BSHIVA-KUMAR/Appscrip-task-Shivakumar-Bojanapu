'use client';

import { useEffect, useMemo, useState } from 'react';
import Filters from './Filters';
import ProductGrid from './ProductGrid';
import SortDropdown from './SortDropdown';
import { sortProducts } from '@/lib/sortProducts';

function uniqueCategories(products) {
  const set = new Set(products.map((p) => p.category));
  return [...set].sort((a, b) => a.localeCompare(b));
}

function maxPriceFrom(products) {
  if (!products.length) return 0;
  return Math.ceil(Math.max(...products.map((p) => p.price), 1));
}

export default function ProductListing({ products, initialQuery = '' }) {
  const categories = useMemo(() => uniqueCategories(products), [products]);
  const ceiling = useMemo(() => maxPriceFrom(products), [products]);

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceLimit, setPriceLimit] = useState(ceiling);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (p.price > priceLimit) return false;
      if (selectedCategories.length && !selectedCategories.includes(p.category)) {
        return false;
      }
      if (q && !p.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, query, selectedCategories, priceLimit]);

  const sortedFiltered = useMemo(
    () => sortProducts(filtered, sortBy),
    [filtered, sortBy],
  );

  function toggleCategory(cat) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  function reset() {
    setSelectedCategories([]);
    setPriceLimit(ceiling);
  }

  if (!products.length) {
    return (
      <p className="plp-empty" role="status">
        No products are available right now.
      </p>
    );
  }

  return (
    <section
      id="products"
      className="plp-layout"
      data-filters={filtersOpen ? 'open' : 'closed'}
      aria-labelledby="catalog-heading"
    >
      <h2 id="catalog-heading" className="plp-sr-only">
        Product catalog
      </h2>
      <div className="plp-toolbar">
        <div className="plp-toolbar__left">
          <p className="plp-count plp-count--items">
            {filtered.length} item{filtered.length === 1 ? '' : 's'}
          </p>
          <button
            type="button"
            className="plp-filter-toggle"
            aria-expanded={filtersOpen}
            aria-controls="filters"
            onClick={() => setFiltersOpen((v) => !v)}
          >
            {filtersOpen ? '< Hide filter' : '> Show filter'}
          </button>
        </div>
        <div className="plp-toolbar__sort">
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>
      <Filters
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        maxPrice={ceiling}
        priceLimit={priceLimit}
        onPriceChange={setPriceLimit}
        onReset={reset}
        filtersOpen={filtersOpen}
      />
      <div className="plp-grid-wrap">
        <ProductGrid products={sortedFiltered} />
      </div>
    </section>
  );
}
