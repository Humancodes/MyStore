'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, ShoppingBag, Users } from 'lucide-react';

export default function SellerAnalyticsPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹0',
      change: '+0%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: '0',
      change: '+0%',
      changeType: 'positive' as const,
      icon: ShoppingBag,
    },
    {
      title: 'Total Customers',
      value: '0',
      change: '+0%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Conversion Rate',
      value: '0%',
      change: '+0%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-600 mt-1">Track your business performance</p>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 py-8">
              Sales chart coming soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 py-8">
              Top products list coming soon
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            Revenue timeline chart coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

