'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!supabase) {
      setMessage('Authentication is not configured yet.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Confirmation email sent! Please check your inbox and verify your email to complete sign in.');
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    if (!supabase) {
      setMessage('Authentication is not configured yet.');
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="auth-container">
      <h2 style={{ marginBottom: '1.5rem' }}>Create Account</h2>

      {message && (
        <div style={{ padding: '0.75rem', background: '#e0f2fe', color: '#0369a1', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <button
        onClick={handleGoogleSignUp}
        style={{
          width: '100%',
          marginTop: '0.75rem',
          padding: '0.75rem',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          background: '#fff',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Sign Up with Google
      </button>

      <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
        Already have an account? <Link href="/signin">Sign In</Link>
      </p>
    </div>
  );
}