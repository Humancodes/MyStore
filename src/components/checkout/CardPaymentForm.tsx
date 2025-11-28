'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cardPaymentSchema, type CardPaymentFormData } from '@/lib/validations/checkout';
import { Suspense, lazy } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import StripeProvider from '@/providers/StripeProvider';
import { Loader2 } from 'lucide-react';

// Lazy load StripeCardForm - heavy component with Stripe Elements
const StripeCardForm = lazy(() => import('./StripeCardForm'));

interface CardPaymentFormProps {
  onChange: (data: CardPaymentFormData | null) => void;
  defaultValues?: Partial<CardPaymentFormData>;
  amount?: number;
  onStripePaymentSuccess?: (paymentIntentId: string) => void;
  onStripePaymentError?: (error: string) => void;
}

export default function CardPaymentForm({ 
  onChange, 
  defaultValues, 
  amount,
  onStripePaymentSuccess,
  onStripePaymentError,
}: CardPaymentFormProps) {
  const [useStripe, setUseStripe] = useState(!!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);
  
  const form = useForm<CardPaymentFormData>({
    resolver: zodResolver(cardPaymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      ...(defaultValues || {}),
    },
  });

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    form.setValue('cardNumber', formatted);
    validateAndNotify();
  };

  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    form.setValue('expiryDate', formatted);
    validateAndNotify();
  };

  const handleCvvChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    form.setValue('cvv', cleaned);
    validateAndNotify();
  };

  const validateAndNotify = () => {
    form.trigger().then((isValid) => {
      if (isValid) {
        const data = form.getValues();
        onChange(data);
      } else {
        onChange(null);
      }
    });
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!useStripe || !amount || amount <= 0 || clientSecret) {
        return;
      }

      setIsCreatingIntent(true);
      setIntentError(null);

      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: 'usd',
            metadata: {
              source: 'checkout',
            },
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      } catch (error: any) {
        console.error('Error creating payment intent:', error);
        setIntentError(error.message || 'Failed to initialize payment');
        onStripePaymentError?.(error.message || 'Failed to initialize payment');
      } finally {
        setIsCreatingIntent(false);
      }
    };

    createPaymentIntent();
  }, [useStripe, amount, clientSecret, onStripePaymentError]);

  if (useStripe && amount) {
    if (isCreatingIntent) {
      return (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-gray-600">Initializing secure payment...</p>
        </div>
      );
    }

    if (intentError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{intentError}</p>
          <button
            onClick={() => {
              setClientSecret(null);
              setPaymentIntentId(null);
              setIntentError(null);
            }}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Try again
          </button>
        </div>
      );
    }

    if (!clientSecret) {
      return null;
    }
    return (
      <div className="space-y-4">
        <StripeProvider
          options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
            },
          }}
        >
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-gray-600">Loading payment form...</p>
            </div>
          }>
            <StripeCardForm
              onPaymentSuccess={(paymentIntentId) => {
                onChange({
                  cardNumber: 'stripe',
                  expiryDate: '',
                  cvv: '',
                  cardName: '',
                });
                onStripePaymentSuccess?.(paymentIntentId);
              }}
              onPaymentError={(error) => {
                onStripePaymentError?.(error);
              }}
            />
          </Suspense>
        </StripeProvider>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <FormField
          control={form.control}
          name="cardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    validateAndNotify();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  {...field}
                  onChange={(e) => {
                    handleCardNumberChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="MM/YY"
                    maxLength={5}
                    {...field}
                    onChange={(e) => {
                      handleExpiryChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="123"
                    maxLength={4}
                    {...field}
                    onChange={(e) => {
                      handleCvvChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>
    </Form>
  );
}

