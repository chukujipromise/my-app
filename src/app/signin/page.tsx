'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    if (!supabase) {
      setErrorMsg('Authentication is not configured yet.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  const handleGoogleSignIn = async () => {
    if (!supabase) {
      setErrorMsg('Authentication is not configured yet.');
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
      <h2 style={{ marginBottom: '1.5rem' }}>Sign In</h2>

      {errorMsg && (
        <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
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
        Sign In with Google
      </button>

      <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
}