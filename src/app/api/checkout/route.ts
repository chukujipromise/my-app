import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, shippingAddress, totalAmount, items } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order details' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Insert order record into Supabase "orders" table
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customerName,
          customer_email: customerEmail,
          shipping_address: shippingAddress,
          total_amount: totalAmount,
          items: items,
          status: 'completed',
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, order: data[0] }, { status: 201 });
  } catch (error) {
    console.error('Supabase Insertion Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to save order to database';
    return NextResponse.json(
      { error: message },
      { status: message.startsWith('Supabase is not configured') ? 503 : 500 }
    );
  }
}