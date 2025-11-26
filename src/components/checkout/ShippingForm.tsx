'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingAddressSchema, type ShippingAddressFormData } from '@/lib/validations/checkout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { COMPANY_INFO } from '@/lib/constants';
import { useEffect, useImperativeHandle, forwardRef } from 'react';

interface ShippingFormProps {
  onSubmit: (data: ShippingAddressFormData) => void;
  defaultValues?: Partial<ShippingAddressFormData>;
}

export interface ShippingFormRef {
  submit: () => Promise<void>;
}

const ShippingForm = forwardRef<ShippingFormRef, ShippingFormProps>(
  ({ onSubmit, defaultValues }, ref) => {
    const form = useForm<ShippingAddressFormData>({
      resolver: zodResolver(shippingAddressSchema),
      mode: 'onChange',
      defaultValues: {
        fullName: '',
        phone: '',
        street: '',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        zipCode: '226010',
        country: 'India',
        ...(defaultValues || {}),
      },
    });

    const handleSubmit = form.handleSubmit((data) => {
      onSubmit(data);
    }, (errors) => {
      console.log('Form validation errors:', errors);
    });

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
        <form onSubmit={handleSubmit} className="space-y-4" id="shipping-form">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Lucknow" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Uttar Pradesh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="226010" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

          <button type="submit" className="hidden" />
        </form>
      </Form>
    );
  }
);

ShippingForm.displayName = 'ShippingForm';

export default ShippingForm;

