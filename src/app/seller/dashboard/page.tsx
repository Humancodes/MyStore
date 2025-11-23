'use client';

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useSellerStatus } from '@/hooks/useSellerStatus';
import { FirestoreService } from '@/services/firestoreService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  totalRevenue: number;
  conversionRate: number;
}

export default function SellerDashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const { seller } = useSellerStatus();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      fetchDashboardStats();
    }
  }, [user?.uid]);

  const fetchDashboardStats = async () => {
    if (!user?.uid) return;

    try {
      const [products, orders] = await Promise.all([
        FirestoreService.getProductsBySeller(user.uid, 'active'),
        FirestoreService.getOrdersBySeller(user.uid),
      ]);

      const totalProducts = products.length;
      const activeProducts = products.filter(p => p.status === 'active').length;
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      const conversionRate = totalProducts > 0 
        ? (totalOrders / totalProducts) * 100 
        : 0;

      setStats({
        totalProducts,
        activeProducts,
        totalOrders,
        totalRevenue,
        conversionRate: Math.round(conversionRate * 10) / 10,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      change: `${stats.activeProducts} active`,
      changeType: 'positive' as const,
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      change: '+0%',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+0%',
      changeType: 'positive' as const,
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      change: '+0%',
      changeType: 'positive' as const,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
        {statsCards.map((stat) => {
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

