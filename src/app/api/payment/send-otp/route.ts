import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getServiceSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase service configuration is missing.');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(req: Request) {
  try {
    const { email, amount, paymentId } = await req.json();

    if (!email || !amount || !paymentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // 1. Generate a secure 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Set expiration to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // 3. Upsert record in Supabase
    const { error: dbError } = await supabase
      .from('payment_verifications')
      .upsert(
        {
          payment_id: paymentId,
          email,
          amount,
          otp_code: otpCode,
          status: 'PENDING',
          expires_at: expiresAt,
        },
        { onConflict: 'payment_id' }
      );

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 4. Send email via Mailgun HTTP API
    const formData = new FormData();
    formData.append('from', 'Security & Verification <no-reply@' + process.env.MAILGUN_DOMAIN + '>');
    formData.append('to', email);
    formData.append('subject', `Verify Payment #${paymentId}`);
    formData.append(
      'html',
      `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Confirm Your Payment</h2>
        <p>You are authorizing a payment of <strong>$${amount}</strong> (Ref: <code>${paymentId}</code>).</p>
        <p>Your verification code is: <b style="font-size: 24px; color: #2563eb;">${otpCode}</b></p>
        <p>This code will expire in 10 minutes.</p>
      </div>
      `
    );

    const mailgunResponse = await fetch(
      `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64'),
        },
        body: formData,
      }
    );

    if (!mailgunResponse.ok) {
      const errorText = await mailgunResponse.text();
      return NextResponse.json({ error: `Mailgun failed: ${errorText}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Verification OTP sent to email.' });
  } catch (err: any) {
    const message = err instanceof Error ? err.message : 'Failed to send OTP';
    return NextResponse.json({ error: message }, { status: 503 });
  }
}