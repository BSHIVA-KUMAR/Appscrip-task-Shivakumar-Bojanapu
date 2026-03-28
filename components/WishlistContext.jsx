'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const WishlistContext = createContext(null);

function snapshotProduct(product) {
  return {
    id: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    category: product.category,
  };
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const isLiked = useCallback(
    (id) => items.some((p) => p.id === id),
    [items],
  );

  const toggleWish = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, snapshotProduct(product)];
    });
  }, []);

  const removeWish = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      items,
      toggleWish,
      removeWish,
      isLiked,
      open,
      setOpen,
      wishCount: items.length,
      togglePanel: () => setOpen((o) => !o),
    }),
    [items, toggleWish, removeWish, isLiked, open],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return ctx;
}
