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
    const { paymentId, submittedOtp } = await req.json();

    if (!paymentId || !submittedOtp) {
      return NextResponse.json({ error: 'Missing paymentId or submittedOtp' }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // 1. Fetch OTP record from Supabase
    const { data: record, error: fetchError } = await supabase
      .from('payment_verifications')
      .select('*')
      .eq('payment_id', paymentId)
      .single();

    if (fetchError || !record) {
      return NextResponse.json({ error: 'Payment transaction not found' }, { status: 404 });
    }

    // 2. Validate status and expiration
    if (record.status === 'VERIFIED') {
      return NextResponse.json({ error: 'Payment is already verified' }, { status: 400 });
    }

    const now = new Date();
    const expirationDate = new Date(record.expires_at);

    if (now > expirationDate) {
      await supabase
        .from('payment_verifications')
        .update({ status: 'EXPIRED' })
        .eq('payment_id', paymentId);

      return NextResponse.json({ error: 'OTP has expired. Please request a new code.' }, { status: 400 });
    }

    // 3. Verify submitted OTP
    if (record.otp_code !== submittedOtp.trim()) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // 4. Update status to VERIFIED
    const { error: updateError } = await supabase
      .from('payment_verifications')
      .update({ status: 'VERIFIED' })
      .eq('payment_id', paymentId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Payment successfully verified.' });
  } catch (err: any) {
    const message = err instanceof Error ? err.message : 'Verification failed';
    return NextResponse.json({ error: message }, { status: 503 });
  }
}