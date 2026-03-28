import { Inter, Roboto } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  title: 'Product Listing | mettā muse — Browse & Filter',
  description:
    'Browse our product catalog with category filters, price range, and search. Responsive product listing page with server-rendered content for fast discovery.',
  keywords: ['product listing', 'catalog', 'shop', 'filters', 'e-commerce'],
  openGraph: {
    title: 'Product Listing | mettā muse',
    description:
      'Browse products with filters and search. Demo storefront powered by Fake Store API.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
