'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Store, ShoppingBag, DollarSign } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Users',
      value: '0',
      icon: Users,
      change: '+0%',
    },
    {
      title: 'Total Sellers',
      value: '0',
      icon: Store,
      change: '+0%',
    },
    {
      title: 'Total Orders',
      value: '0',
      icon: ShoppingBag,
      change: '+0%',
    },
    {
      title: 'Total Revenue',
      value: '₹0',
      icon: DollarSign,
      change: '+0%',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-600 mt-1">System statistics and metrics</p>
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
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            <p>• Manage pending seller approvals</p>
            <p>• View recent orders</p>
            <p>• Monitor system health</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

