'use client';

export default function Filters({
  categories,
  selectedCategories,
  onToggleCategory,
  maxPrice,
  priceLimit,
  onPriceChange,
  onReset,
  filtersOpen,
}) {
  const openClass = filtersOpen ? 'plp-filters--open' : '';

  return (
    <aside
      id="filters"
      className={`plp-filters ${openClass}`.trim()}
      aria-labelledby="filters-heading"
    >
      <h2 id="filters-heading" className="plp-filters__title">
        Filters
      </h2>
      <fieldset>
        <legend>Category</legend>
        <ul className="plp-filter-list">
          {categories.map((cat) => (
            <li key={cat}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onToggleCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend>Max price</legend>
        <div className="plp-price">
          <label className="plp-price__label" htmlFor="price-range">
            Up to ${priceLimit.toFixed(0)}
          </label>
          <input
            id="price-range"
            className="plp-price__input"
            type="range"
            min="0"
            max={maxPrice}
            step="1"
            value={priceLimit}
            onChange={(e) => onPriceChange(Number(e.target.value))}
          />
          <span className="plp-price__value" aria-live="polite">
            $0 — ${priceLimit.toFixed(0)}
          </span>
        </div>
      </fieldset>
      <button type="button" className="plp-reset" onClick={onReset}>
        Clear filters
      </button>
    </aside>
  );
}
