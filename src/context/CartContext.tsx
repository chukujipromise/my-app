 'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 199.99,
    description: 'High-fidelity audio with active noise cancellation and 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
  },
  {
    id: '2',
    name: 'Minimalist Smart Watch',
    price: 149.99,
    description: 'Sleek fitness tracking smartwatch with heart rate monitoring and AMOLED display.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
  },
  {
    id: '3',
    name: 'Mechanical Gaming Keyboard',
    price: 89.99,
    description: 'RGB backlit mechanical switches with durable aluminum frame.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
  },
  {
    id: '4',
    name: 'Ergonomic Studio Chair',
    price: 299.99,
    description: 'Breathable mesh back with adjustable lumbar support for long sessions.',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=600&q=80',
  },
  {
    id: '5',
    name: 'Ultra-Slim Wireless Mouse',
    price: 39.99,
    description: 'Silent click ergonomic wireless mouse with dual Bluetooth and 2.4G connectivity.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80',
  },
  {
    id: '6',
    name: '4K Ultra HD Monitor 27"',
    price: 349.99,
    description: 'IPS display panel with HDR10 support, ultra-thin bezels, and USB-C hub.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
  },
  {
    id: '7',
    name: 'Studio Condenser Microphone',
    price: 119.99,
    description: 'USB cardioid condenser microphone with gain control for podcasting and streaming.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
  },
  {
    id: '8',
    name: 'Portable SSD Hard Drive 1TB',
    price: 129.99,
    description: 'Ultra-fast read speeds up to 1050MB/s with rugged shock-resistant casing.',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80',
  },
  {
    id: '9',
    name: 'True Wireless Bluetooth Earbuds',
    price: 79.99,
    description: 'In-ear wireless earbuds with wireless charging case and IPX7 water resistance.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
  },
  {
    id: '10',
    name: 'Smart Home LED Ambient Light',
    price: 49.99,
    description: 'Wi-Fi enabled color-changing light bar compatible with Alexa and Google Assistant.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
  },
  {
    id: '11',
    name: 'HD Webcam with Dual Mics',
    price: 59.99,
    description: '1080p 60fps auto-focus webcam with privacy shutter and noise reduction.',
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80',
  },
  {
    id: '12',
    name: 'Fast Wireless Charging Pad',
    price: 29.99,
    description: '15W Qi-certified fast charging station for smartphones and wireless earbuds.',
    image: 'https://images.unsplash.com/photo-1622445268121-8b1d1887e07a?w=600&q=80',
  },
  {
    id: '13',
    name: 'USB-C Multi-Port Adapter Hub',
    price: 45.99,
    description: '7-in-1 hub featuring 4K HDMI, 100W Power Delivery, SD reader, and USB 3.0 ports.',
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=600&q=80',
  },
  {
    id: '14',
    name: 'High-Fidelity Desktop Speakers',
    price: 139.99,
    description: 'Compact powered Bluetooth studio monitors with deep bass and clean treble.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80',
  },
  {
    id: '15',
    name: 'Extended RGB Gaming Mouse Pad',
    price: 24.99,
    description: 'Large desk mat with non-slip rubber base and customizable edge lighting modes.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
  },
  {
    id: '16',
    name: 'Adjustable Aluminium Laptop Stand',
    price: 34.99,
    description: 'Foldable ergonomic laptop riser designed to improve airflow and sitting posture.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
  },
  {
    id: '17',
    name: 'Smart Fitness Body Scale',
    price: 39.99,
    description: 'Digital scale tracking body composition metrics with automatic mobile app sync.',
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&q=80',
  },
  {
    id: '18',
    name: 'Noise-Isolating Desk Pad Mat',
    price: 21.99,
    description: 'Premium wool felt desk protector mat for keyboard and mouse precision.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
  },
  {
    id: '19',
    name: 'Action Camera 4K Waterproof',
    price: 169.99,
    description: 'Rugged sports camera featuring dual screens and electronic image stabilization.',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
  },
  {
    id: '20',
    name: 'Portable Power Bank 20,000mAh',
    price: 49.99,
    description: 'High-capacity external battery with digital display and fast dual-output ports.',
    image: 'https://images.unsplash.com/photo-1609592424009-51a82f3c7ef2?w=600&q=80',
  },
];

interface CartContextValue {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => {
      const itemIndex = currentCart.findIndex((item) => item.id === productId);
      if (itemIndex === -1) return currentCart;
      return currentCart.filter((_, index) => index !== itemIndex);
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}