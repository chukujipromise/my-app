'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Account created for ${fullName}`);
  };

  return (
    <div className="auth-container">
      <h2 style={{ marginBottom: '1.5rem' }}>Create Account</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="signup-name">Full Name</label>
          <input
            id="signup-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">Email Address</label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
        Already have an account? <Link href="/signin">Sign In</Link>
      </p>
    </div>
  );
}