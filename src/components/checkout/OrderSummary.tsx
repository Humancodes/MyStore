'use client';

import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function OrderSummary() {
  const { items, totalPrice, totalItems } = useAppSelector((state) => state.cart);

  const shippingCost: number = 0;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shippingCost + tax;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({totalItems} items)</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">
              {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

