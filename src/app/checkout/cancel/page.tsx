'use client';

import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">
            Your payment was cancelled. No charges were made to your account.
          </p>

          <div className="flex flex-col gap-2 pt-4">
            <Link href="/checkout">
              <Button className="w-full" size="lg">
                Try Again
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" className="w-full">
                Back to Cart
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

