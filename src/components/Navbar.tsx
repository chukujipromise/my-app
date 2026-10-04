'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const { user, signOut } = useAuth();

  // Extract display name or email initials
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        NovaStore
      </Link>

      <div className="nav-links">
        <Link href="/">Products</Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              {initial}
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{displayName}</span>
            <button
              onClick={signOut}
              style={{
                background: 'transparent',
                border: '1px solid #cbd5e1',
                color: '#fff',
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}

        <Link href="/checkout" style={{ fontWeight: 700 }}>
          Cart <span className="cart-badge">{cart.length}</span>
        </Link>
      </div>
    </nav>
  );
}