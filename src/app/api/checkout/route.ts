import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
  } catch (error: any) {
    console.error('Supabase Insertion Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save order to database' },
      { status: 500 }
    );
  }
}