'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { upiPaymentSchema, type UpiPaymentFormData } from '@/lib/validations/checkout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Smartphone } from 'lucide-react';

interface UpiPaymentFormProps {
  onChange: (data: UpiPaymentFormData | null) => void;
  defaultValues?: Partial<UpiPaymentFormData>;
}

export default function UpiPaymentForm({ onChange, defaultValues }: UpiPaymentFormProps) {
  const form = useForm<UpiPaymentFormData>({
    resolver: zodResolver(upiPaymentSchema),
    defaultValues: {
      upiId: '',
      ...(defaultValues || {}),
    },
  });

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

  return (
    <Form {...form}>
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Smartphone className="h-4 w-4" />
          <span>Enter your UPI ID to pay via UPI apps</span>
        </div>

        <FormField
          control={form.control}
          name="upiId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UPI ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="yourname@paytm"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    validateAndNotify();
                  }}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500 mt-1">
                Examples: name@paytm, name@ybl, name@phonepe, name@googlepay
              </p>
            </FormItem>
          )}
        />

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

