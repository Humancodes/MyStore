import { z } from 'zod';

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      'Invalid phone number'
    ),
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  zipCode: z.string().regex(/^\d{5,6}(-\d{4})?$/, 'Invalid zip code'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
});

export const cardPaymentSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Invalid card number'),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
  cardName: z.string().min(2, 'Cardholder name must be at least 2 characters'),
});

export const upiPaymentSchema = z.object({
  upiId: z
    .string()
    .regex(/^[\w.-]+@[\w]+$/, 'Invalid UPI ID (e.g., name@paytm)'),
});

export const paymentMethodSchema = z
  .object({
    paymentMethod: z.enum(['card', 'upi', 'cod']),
    cardDetails: cardPaymentSchema.optional(),
    upiDetails: upiPaymentSchema.optional(),
  })
  .refine(
    data => {
      if (data.paymentMethod === 'card' && !data.cardDetails) {
        return false;
      }
      if (data.paymentMethod === 'upi' && !data.upiDetails) {
        return false;
      }
      return true;
    },
    {
      message: 'Please fill in all required payment details',
      path: ['paymentMethod'],
    }
  );

export const checkoutSchema = z.object({
  shipping: shippingAddressSchema,
  payment: paymentMethodSchema,
});

export type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;
export type CardPaymentFormData = z.infer<typeof cardPaymentSchema>;
export type UpiPaymentFormData = z.infer<typeof upiPaymentSchema>;
export type PaymentMethodFormData = z.infer<typeof paymentMethodSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
