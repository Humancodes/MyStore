'use client';

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentMethodSchema, type PaymentMethodFormData, type CardPaymentFormData, type UpiPaymentFormData } from '@/lib/validations/checkout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, Package } from 'lucide-react';
import { Label } from '@/components/ui/label';
import CardPaymentForm from './CardPaymentForm';
import UpiPaymentForm from './UpiPaymentForm';

interface PaymentFormProps {
  onSubmit: (data: PaymentMethodFormData) => void;
  defaultValues?: Partial<PaymentMethodFormData>;
}

export interface PaymentFormRef {
  submit: () => Promise<void>;
}

const PaymentForm = forwardRef<PaymentFormRef, PaymentFormProps>(
  ({ onSubmit, defaultValues }, ref) => {
  const [cardDetails, setCardDetails] = useState<CardPaymentFormData | null>(null);
  const [upiDetails, setUpiDetails] = useState<UpiPaymentFormData | null>(null);

  const form = useForm<PaymentMethodFormData>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      paymentMethod: 'cod',
      ...(defaultValues || {}),
    },
  });

  const paymentMethod = form.watch('paymentMethod');
  const [hasSelectedMethod, setHasSelectedMethod] = useState(false);

  useEffect(() => {
    if (paymentMethod === 'cod' && hasSelectedMethod) {
      form.setValue('cardDetails', undefined);
      form.setValue('upiDetails', undefined);
    }
  }, [paymentMethod, hasSelectedMethod, form]);

  const handlePaymentMethodChange = (value: string) => {
    setHasSelectedMethod(true);
    form.setValue('paymentMethod', value as 'card' | 'upi' | 'cod');
    form.setValue('cardDetails', undefined);
    form.setValue('upiDetails', undefined);
    setCardDetails(null);
    setUpiDetails(null);
  };

  const handleCardDetailsChange = (data: CardPaymentFormData | null) => {
    setCardDetails(data);
    if (data) {
      form.setValue('cardDetails', data);
      form.setValue('upiDetails', undefined);
    }
  };

  const handleUpiDetailsChange = (data: UpiPaymentFormData | null) => {
    setUpiDetails(data);
    if (data) {
      form.setValue('upiDetails', data);
      form.setValue('cardDetails', undefined);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        onSubmit(data);
      }
    },
  }));

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={handlePaymentMethodChange}
                  value={field.value}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-gray-500">Pay when you receive</div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">UPI</div>
                          <div className="text-sm text-gray-500">Pay via UPI apps</div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-500">Visa, Mastercard, etc.</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {paymentMethod === 'card' && (
          <CardPaymentForm
            onChange={handleCardDetailsChange}
            defaultValues={defaultValues?.cardDetails}
            amount={undefined}
          />
        )}

        {paymentMethod === 'upi' && (
          <UpiPaymentForm
            onChange={handleUpiDetailsChange}
            defaultValues={defaultValues?.upiDetails}
          />
        )}

        {paymentMethod === 'cod' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              You will pay cash when the order is delivered to your address.
            </p>
          </div>
        )}

        <button type="submit" className="hidden" />
      </form>
    </Form>
  );
});

PaymentForm.displayName = 'PaymentForm';

export default PaymentForm;

