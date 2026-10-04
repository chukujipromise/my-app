// src/app/checkout/page.tsx
import PaymentVerificationModal from '@/components/PaymentVerificationModal';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Complete Your Order</h1>
      
      {/* Import and pass the payment details */}
      <PaymentVerificationModal 
        paymentId="PAY-99218" 
        email="user@example.com" 
        amount={150.00} 
      />
    </main>
  );
}