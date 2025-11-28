'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard } from 'lucide-react';
import { FirestoreService } from '@/services/firestoreService';
import type { Order } from '@/types/firestore';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending: {
    label: 'Pending',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-yellow-600 bg-yellow-50',
  },
  confirmed: {
    label: 'Confirmed',
    icon: <CheckCircle className="h-4 w-4" />,
    color: 'text-blue-600 bg-blue-50',
  },
  processing: {
    label: 'Processing',
    icon: <Package className="h-4 w-4" />,
    color: 'text-blue-600 bg-blue-50',
  },
  shipped: {
    label: 'Shipped',
    icon: <Truck className="h-4 w-4" />,
    color: 'text-purple-600 bg-purple-50',
  },
  delivered: {
    label: 'Delivered',
    icon: <CheckCircle className="h-4 w-4" />,
    color: 'text-green-600 bg-green-50',
  },
  cancelled: {
    label: 'Cancelled',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-red-600 bg-red-50',
  },
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!params.id || typeof params.id !== 'string') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const orderData = await FirestoreService.getOrder(params.id);
        if (orderData && orderData.buyerId === user?.uid) {
          setOrder(orderData);
        } else {
          router.push('/buyer/dashboard/orders');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        router.push('/buyer/dashboard/orders');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrder();
    }
  }, [params.id, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Order not found</p>
        <Link href="/buyer/dashboard/orders">
          <Button className="mt-4">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const statusInfo = statusConfig[order.orderStatus] || statusConfig.pending;
  let orderDate = new Date();
  if (order.createdAt) {
    if (typeof order.createdAt.toDate === 'function') {
      orderDate = order.createdAt.toDate();
    } else if (order.createdAt.seconds) {
      orderDate = new Date(order.createdAt.seconds * 1000);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          <p className="text-gray-600 mt-1">Order #{order.id.slice(0, 8).toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order Status</CardTitle>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                >
                  {statusInfo.icon}
                  {statusInfo.label}
                </div>
              </div>
              <CardDescription>
                Placed on {orderDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item.productTitle}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ${item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600">{order.shippingAddress.phone}</p>
                <p className="text-gray-600">{order.shippingAddress.street}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Payment Method</p>
                    <p className="text-gray-600 capitalize">{order.paymentMethod}</p>
                    <p className="text-xs text-gray-500 capitalize mt-1">
                      Status: {order.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>

              {order.orderStatus === 'pending' && (
                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700"
                  onClick={() => {
                    if (confirm('Are you sure you want to cancel this order?')) {
                      alert('Cancel order functionality coming soon');
                    }
                  }}
                >
                  Cancel Order
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

