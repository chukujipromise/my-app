import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'NovaStore - E-Commerce Shop',
  description: 'Shop top products with easy checkout',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Step 1: Wrap everything inside CartProvider */}
        <CartProvider>
          {/* Step 2: Place Navbar here so it shows on top of EVERY page */}
          <Navbar />

          {/* Step 3: Next.js injects whichever page the user visits right here */}
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}