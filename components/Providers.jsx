'use client';

import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';

export default function Providers({ children }) {
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
}
