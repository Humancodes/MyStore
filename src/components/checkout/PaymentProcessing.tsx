'use client';

import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentProcessingProps {
  paymentMethod: 'card' | 'upi' | 'cod';
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PaymentProcessing({
  paymentMethod,
  amount,
  onSuccess,
  onError,
}: PaymentProcessingProps) {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('');
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    if (hasProcessed) return;

    const processPayment = async () => {
      setHasProcessed(true);
      
      try {
        if (paymentMethod === 'cod') {
          setMessage('Processing Cash on Delivery order...');
          await new Promise(resolve => setTimeout(resolve, 1500));
          setStatus('success');
          setMessage('Order confirmed! Payment will be collected on delivery.');
          setTimeout(() => {
            onSuccess();
          }, 2000);
          return;
        }

        if (paymentMethod === 'upi') {
          setMessage('Initiating UPI payment...');
          await new Promise(resolve => setTimeout(resolve, 2000));
          setMessage('Waiting for payment confirmation...');
          await new Promise(resolve => setTimeout(resolve, 2000));
          setStatus('success');
          setMessage('UPI payment successful!');
          setTimeout(() => {
            onSuccess();
          }, 2000);
          return;
        }

        if (paymentMethod === 'card') {
          setMessage('Processing card payment...');
          await new Promise(resolve => setTimeout(resolve, 2000));
          setMessage('Verifying payment details...');
          await new Promise(resolve => setTimeout(resolve, 1500));
          setStatus('success');
          setMessage('Card payment successful!');
          setTimeout(() => {
            onSuccess();
          }, 2000);
          return;
        }
      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'Payment processing failed');
        setTimeout(() => {
          onError(error.message || 'Payment processing failed');
        }, 3000);
      }
    };

    processPayment();
  }, [paymentMethod, amount, onSuccess, onError, hasProcessed]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-center">Processing Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center py-8">
            {status === 'processing' && (
              <>
                <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                <p className="text-lg font-medium text-gray-900">{message}</p>
                <p className="text-sm text-gray-500 mt-2">Please wait...</p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <p className="text-lg font-medium text-green-600">{message}</p>
                <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="h-16 w-16 text-red-500 mb-4" />
                <p className="text-lg font-medium text-red-600">{message}</p>
                <p className="text-sm text-gray-500 mt-2">Please try again</p>
              </>
            )}
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">${amount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

