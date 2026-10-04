'use client';

import { useState } from 'react';

interface PaymentVerificationModalProps {
  paymentId: string;
  email?: string;
  amount?: number;
}

export default function PaymentVerificationModal({
  paymentId,
  email = 'user@example.com',
  amount = 0,
}: PaymentVerificationModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSendOTP() {
    setIsSending(true);
    setError(null);
    setMessage(null);

    const response = await fetch('/api/payment/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentId,
        email,
        amount,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? 'Unable to send verification code.');
    } else {
      setMessage(payload.message ?? 'Verification code sent successfully.');
    }

    setIsSending(false);
  }

  async function handleVerifyOTP() {
    setIsVerifying(true);
    setError(null);
    setMessage(null);

    const response = await fetch('/api/payment/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentId,
        submittedOtp: code,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? 'Unable to verify payment.');
    } else {
      setMessage(payload.message ?? 'Payment successfully verified.');
    }

    setIsVerifying(false);
  }

  return (
    <div className="checkout-container" style={{ maxWidth: 520 }}>
      <h2 style={{ marginBottom: '1rem' }}>Payment Verification</h2>

      <div style={{ marginBottom: '1rem', color: '#475569' }}>
        <p><strong>Payment ID:</strong> {paymentId}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Amount:</strong> ${Number(amount).toFixed(2)}</p>
      </div>

      {message && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#dcfce7', color: '#166534', borderRadius: 8 }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fee2e2', color: '#991b1b', borderRadius: 8 }}>
          {error}
        </div>
      )}

      <button className="btn-primary" onClick={handleSendOTP} disabled={isSending} style={{ width: '100%' }}>
        {isSending ? 'Sending code...' : 'Send verification code'}
      </button>

      <div className="form-group" style={{ marginTop: '1.25rem' }}>
        <label htmlFor="otp-code">Enter verification code</label>
        <input
          id="otp-code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
        />
      </div>

      <button className="btn-primary" onClick={handleVerifyOTP} disabled={isVerifying || code.length !== 6} style={{ width: '100%' }}>
        {isVerifying ? 'Verifying...' : 'Verify Payment'}
      </button>
    </div>
  );
}
