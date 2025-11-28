'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import ProtectedRoute from '@/components/ProtectedRoute';
import ShippingForm, { type ShippingFormRef } from '@/components/checkout/ShippingForm';
import type { ShippingAddressFormData, PaymentMethodFormData } from '@/lib/validations/checkout';
import OrderSummary from '@/components/checkout/OrderSummary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Package, CreditCard, FileCheck } from 'lucide-react';
import { FirestoreService } from '@/services/firestoreService';
import type { ShippingAddress, OrderItem } from '@/types/firestore';
import { useNotification, notificationMessages } from '@/hooks/useNotification';
import PaymentProcessing from '@/components/checkout/PaymentProcessing';
import PaymentFormSkeleton from '@/components/skeletons/PaymentFormSkeleton';

// Lazy load PaymentForm - heavy component with Stripe integration
// Import the type first
import type { PaymentFormRef } from '@/components/checkout/PaymentForm';

const PaymentForm = dynamic(() => import('@/components/checkout/PaymentForm'), {
  loading: () => <PaymentFormSkeleton />,
  ssr: false, // Payment forms don't need SSR
});

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'processing';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const notify = useNotification();
  const { items, totalPrice, totalItems } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth.user);

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<ShippingAddressFormData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentMethodFormData | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showPaymentProcessing, setShowPaymentProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shippingFormRef = useRef<ShippingFormRef>(null);
  const paymentFormRef = useRef<PaymentFormRef>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const handleShippingSubmit = (data: ShippingAddressFormData) => {
    setShippingData(data);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (data: PaymentMethodFormData) => {
    setPaymentData(data);
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    if (!user || !shippingData || !paymentData || orderPlaced) return;

    setCurrentStep('processing');
    setShowPaymentProcessing(true);
  };

  const handlePaymentSuccess = async () => {
    if (!user || !shippingData || !paymentData || orderPlaced || isPlacingOrder) return;

    setIsPlacingOrder(true);
    setShowPaymentProcessing(false);
    setOrderPlaced(true);

    try {
      const shippingAddress: ShippingAddress = {
        fullName: shippingData.fullName,
        phone: shippingData.phone,
        street: shippingData.street,
        city: shippingData.city,
        state: shippingData.state,
        zipCode: shippingData.zipCode,
        country: shippingData.country,
      };

      const orderItems: OrderItem[] = items.map((item) => ({
        productId: String(item.id),
        productTitle: item.title,
        productImage: item.image,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        sellerId: 'seller_k5Ss3i2Tj3eeRWLq4qX1iw5JJp12',
      }));

      const shippingCost = 0;
      const tax = totalPrice * 0.1;
      const total = totalPrice + shippingCost + tax;

      const paymentStatus = paymentData.paymentMethod === 'cod' ? 'pending' : 'completed';

      const orderId = await FirestoreService.createOrder({
        buyerId: user.uid,
        items: orderItems,
        shippingAddress,
        paymentMethod: paymentData.paymentMethod,
        paymentStatus,
        orderStatus: 'pending',
        subtotal: totalPrice,
        shippingCost,
        tax,
        total,
      });

      dispatch(clearCart());
      
      notify.success(notificationMessages.order.placed, {
        action: {
          label: 'View Order',
          onClick: () => router.push(`/buyer/dashboard/orders?orderId=${orderId}`),
        },
      });
      setTimeout(() => {
        router.push(`/buyer/dashboard/orders?orderId=${orderId}`);
      }, 500);
    } catch (error) {
      console.error('Error placing order:', error);
      notify.error(notificationMessages.order.failed);
      setCurrentStep('review');
      setOrderPlaced(false);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setShowPaymentProcessing(false);
    setCurrentStep('review');
    notify.error(error || notificationMessages.payment.failed);
  };

  const handleStripePaymentSuccess = (paymentIntentId: string) => {
    if (paymentData) {
      setPaymentData({
        ...paymentData,
        paymentIntentId: paymentIntentId,
      } as PaymentMethodFormData);
    }
  };

  const handleStripePaymentError = (error: string) => {
    notify.error(error || notificationMessages.payment.failed);
  };

  const steps = [
    { id: 'shipping', label: 'Shipping', icon: Package },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: FileCheck },
  ];

  const shippingCost = 0;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shippingCost + tax;

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  if (items.length === 0) {
    return null;
  }

  return (
    <ProtectedRoute allowedRoles={['buyer', 'admin']} requireAuth={true}>
      {showPaymentProcessing && paymentData && (
        <PaymentProcessing
          paymentMethod={paymentData.paymentMethod}
          amount={total}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                          isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : isCurrent
                            ? 'bg-primary border-primary text-white'
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <StepIcon className="h-6 w-6" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-sm font-medium ${
                          isCurrent ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-4 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentStep === 'shipping' && 'Shipping Address'}
                    {currentStep === 'payment' && 'Payment Method'}
                    {currentStep === 'review' && 'Review Your Order'}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 'shipping' && 'Enter your delivery address'}
                    {currentStep === 'payment' && 'Choose your payment method'}
                    {currentStep === 'review' && 'Review your order details before placing'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {currentStep === 'shipping' && (
                    <div>
                      <ShippingForm
                        ref={shippingFormRef}
                        onSubmit={handleShippingSubmit}
                        defaultValues={shippingData || undefined}
                      />
                      <div className="mt-6 flex justify-end">
                        <Button
                          type="button"
                          onClick={async () => {
                            await shippingFormRef.current?.submit();
                          }}
                          size="lg"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 'payment' && (
                    <Suspense fallback={<PaymentFormSkeleton />}>
                      <div>
                        <PaymentForm
                          ref={paymentFormRef}
                          onSubmit={handlePaymentSubmit}
                          defaultValues={paymentData || undefined}
                          amount={total}
                          onStripePaymentSuccess={handleStripePaymentSuccess}
                          onStripePaymentError={handleStripePaymentError}
                        />
                        <div className="mt-6 flex justify-between">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentStep('shipping')}
                          >
                            Back
                          </Button>
                          <Button
                            type="button"
                            onClick={async () => {
                              await paymentFormRef.current?.submit();
                            }}
                            size="lg"
                          >
                            Continue to Review
                          </Button>
                        </div>
                      </div>
                    </Suspense>
                  )}

                  {currentStep === 'review' && shippingData && paymentData && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium">{shippingData.fullName}</p>
                          <p className="text-gray-600">{shippingData.phone}</p>
                          <p className="text-gray-600">
                            {shippingData.street}, {shippingData.city}, {shippingData.state}{' '}
                            {shippingData.zipCode}
                          </p>
                          <p className="text-gray-600">{shippingData.country}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium capitalize">
                            {paymentData.paymentMethod === 'cod' && 'Cash on Delivery'}
                            {paymentData.paymentMethod === 'upi' && 'UPI'}
                            {paymentData.paymentMethod === 'card' && 'Credit/Debit Card'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep('payment')}
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handlePlaceOrder}
                          size="lg"
                          disabled={isPlacingOrder}
                        >
                          {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

