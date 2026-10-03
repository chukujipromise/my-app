'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        NovaStore
      </Link>
      <div className="nav-links">
        <Link href="/">Products</Link>
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
        <Link href="/checkout" style={{ fontWeight: 700 }}>
          Cart <span className="cart-badge">{cart.length}</span>
        </Link>
      </div>
    </nav>
  );
}