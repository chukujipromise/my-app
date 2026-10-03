'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart, clearCart, removeFromCart } = useCart();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);

    try {
      // Send order data to our API endpoint which writes to Supabase
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: fullName,
          customerEmail: email,
          shippingAddress: address,
          totalAmount: totalAmount,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
          })),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        clearCart();
      } else {
        alert(`Checkout failed: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred while placing your order.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container">
        <div className="checkout-container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1.8rem' }}>
            Order Placed & Persisted!
          </h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Thank you, <strong>{fullName}</strong>. Your order has been recorded in our Supabase database.
          </p>
          <Link href="/" className="btn-primary" style={{ display: 'inline-block' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '1.5rem' }}>Checkout & Order Review</h2>

      {cart.length === 0 ? (
        <div className="checkout-container" style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Your cart is currently empty.
          </p>
          <Link href="/" className="btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Order Summary */}
          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Selected Items ({cart.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.name}</h4>
                    <span style={{ color: '#4f46e5', fontWeight: 700 }}>${item.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
                <span>Total Amount:</span>
                <span style={{ color: '#4f46e5' }}>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="checkout-container" style={{ margin: 0, maxWidth: '100%' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Shipping & Billing Information</h3>
            <form onSubmit={handleCheckoutSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <input
                  type="text"
                  required
                  placeholder="123 Main St, City, Country"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '1rem', fontSize: '1.05rem' }}
                disabled={loading}
              >
                {loading ? 'Saving Order...' : `Complete Purchase ($${totalAmount.toFixed(2)})`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}