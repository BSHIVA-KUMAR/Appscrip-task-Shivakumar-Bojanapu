'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [open, setOpen] = useState(false);

  const addItem = useCallback((product) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.id === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + 1 };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      ];
    });
    setOpen(true);
  }, []);

  const removeLine = useCallback((id) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const setQty = useCallback(
    (id, q) => {
      if (q < 1) {
        removeLine(id);
        return;
      }
      setLines((prev) =>
        prev.map((l) => (l.id === id ? { ...l, quantity: q } : l)),
      );
    },
    [removeLine],
  );

  const totalCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      addItem,
      removeLine,
      clearCart,
      setQty,
      open,
      setOpen,
      toggleCart: () => setOpen((o) => !o),
      totalCount,
      subtotal,
    }),
    [
      lines,
      addItem,
      removeLine,
      clearCart,
      setQty,
      open,
      totalCount,
      subtotal,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
