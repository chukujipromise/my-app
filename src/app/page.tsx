'use client';

import { PRODUCTS, useCart } from '@/context/CartContext';

export default function HomePage() {
  const { addToCart } = useCart();

  return (
    <div>
      <section className="hero">
        <h1>Welcome to NovaStore</h1>
        <p>Premium Tech Gear with Modern Design</p>
      </section>

      <main className="container">
        <h2 style={{ marginBottom: '1.5rem' }}>Catalog</h2>
        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="card">
              <img src={product.image} alt={product.name} className="card-img" />
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  {product.description}
                </p>
                <div className="card-price">${product.price.toFixed(2)}</div>
                <button className="btn-primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}