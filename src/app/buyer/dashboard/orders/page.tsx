'use client';

import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
}

const mockOrders: Order[] = [];

const statusConfig: Record<OrderStatus, { label: string; icon: React.ReactNode; color: string }> = {
  pending: {
    label: 'Pending',
    icon: <Clock className="h-4 w-4" />,
    color: 'text-yellow-600 bg-yellow-50',
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

export default function OrdersPage() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
          <p className="text-gray-600 mt-1">Track and manage your orders</p>
        </div>
      </div>

      {mockOrders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => {
            const statusInfo = statusConfig[order.status];
            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                      <CardDescription className="mt-1">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                    >
                      {statusInfo.icon}
                      {statusInfo.label}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        {order.items} {order.items === 1 ? 'item' : 'items'}
                      </p>
                      <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === 'pending' && (
                        <Button variant="outline" size="sm" className="text-red-600">
                          Cancel Order
                        </Button>
                      )}
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Order Status Guide</CardTitle>
          <CardDescription>Understanding your order status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Pending</p>
                <p className="text-xs text-gray-600">Your order is being reviewed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Processing</p>
                <p className="text-xs text-gray-600">Your order is being prepared</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Shipped</p>
                <p className="text-xs text-gray-600">Your order is on the way</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Delivered</p>
                <p className="text-xs text-gray-600">Your order has been delivered</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

