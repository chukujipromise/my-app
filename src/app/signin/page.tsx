'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Signing in with ${email}`);
  };

  return (
    <div className="auth-container">
      <h2 style={{ marginBottom: '1.5rem' }}>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="signin-email">Email Address</label>
          <input
            id="signin-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signin-password">Password</label>
          <input
            id="signin-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Sign In
        </button>
      </form>
      <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
}