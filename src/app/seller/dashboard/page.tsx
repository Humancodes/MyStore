'use client';

import { useAppSelector } from '@/store/hooks';
import { useSellerStatus } from '@/hooks/useSellerStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SellerDashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const { seller } = useSellerStatus();

  const stats = [
    {
      title: 'Total Products',
      value: '0',
      icon: Package,
      change: '+0%',
      changeType: 'positive',
    },
    {
      title: 'Total Orders',
      value: '0',
      icon: ShoppingBag,
      change: '+0%',
      changeType: 'positive',
    },
    {
      title: 'Total Revenue',
      value: '₹0',
      icon: DollarSign,
      change: '+0%',
      changeType: 'positive',
    },
    {
      title: 'Conversion Rate',
      value: '0%',
      icon: TrendingUp,
      change: '+0%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.displayName || 'Seller'}!</h2>
          {seller && (
            <Badge className="bg-green-100 text-green-800">
              {seller.status === 'approved' ? 'Approved' : seller.status}
            </Badge>
          )}
        </div>
        <p className="text-gray-600 mt-1">Here's what's happening with your store today</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {stat.change}
                  </span>{' '}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold">Complete Your Profile</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Add your business details and verify your account
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold">Add Your First Product</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Start by adding products to your catalog
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold">Start Selling</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Once your products are live, you'll start receiving orders
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

