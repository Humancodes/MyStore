'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cardPaymentSchema, type CardPaymentFormData } from '@/lib/validations/checkout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import StripeCardForm from './StripeCardForm';
import StripeProvider from '@/providers/StripeProvider';

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

  if (useStripe && amount) {
    return (
      <div className="space-y-4">
        <StripeProvider
          options={{
            mode: 'payment',
            amount: Math.round(amount * 100),
            currency: 'usd',
          }}
        >
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

