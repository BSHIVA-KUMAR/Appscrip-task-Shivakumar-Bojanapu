'use client';

import { useEffect, useId, useRef, useState } from 'react';

const OPTIONS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'newest', label: 'Newest first' },
  { id: 'popular', label: 'Popular' },
  { id: 'priceDesc', label: 'Price : high to low' },
  { id: 'priceAsc', label: 'Price : low to high' },
];

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const listId = useId().replace(/:/g, '');

  const current = OPTIONS.find((o) => o.id === value) ?? OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="plp-sort" ref={wrapRef}>
      <button
        type="button"
        className="plp-sort__trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="plp-sort__trigger-label">{current.label}</span>
        <span className="plp-sort__chevron" aria-hidden="true">
          ▼
        </span>
      </button>
      <ul
        id={listId}
        className="plp-sort__menu"
        role="listbox"
        aria-label="Sort products"
        hidden={!open}
      >
        {OPTIONS.map((opt) => (
          <li key={opt.id} role="option" aria-selected={value === opt.id}>
            <button
              type="button"
              className={`plp-sort__option ${value === opt.id ? 'plp-sort__option--active' : ''}`}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
            >
              {value === opt.id ? (
                <span className="plp-sort__check" aria-hidden="true">
                  ✓
                </span>
              ) : (
                <span className="plp-sort__check plp-sort__check--spacer" aria-hidden="true" />
              )}
              <span>{opt.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
