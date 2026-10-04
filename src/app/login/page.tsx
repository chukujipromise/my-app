'use client';

import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  async function handleGoogleLogin() {
    if (!supabase) {
      console.error('Authentication is not configured yet.');
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) console.error('Error logging in:', error.message);
  }

  return (
    <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  );
}