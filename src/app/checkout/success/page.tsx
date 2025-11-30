'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    if (!orderId && !paymentIntentId) {
      router.push('/');
    }
  }, [orderId, paymentIntentId, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">
            Your order has been placed successfully and payment has been processed.
          </p>
          
          {orderId && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono text-sm font-semibold">{orderId}</p>
            </div>
          )}

          {paymentIntentId && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Payment Intent ID</p>
              <p className="font-mono text-sm font-semibold">{paymentIntentId}</p>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-4">
            <Link href="/buyer/dashboard/orders">
              <Button className="w-full" size="lg">
                View Orders
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

