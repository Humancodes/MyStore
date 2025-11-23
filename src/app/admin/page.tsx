'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Store, ShoppingBag, DollarSign } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalSellers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingSellers: number;
  approvedSellers: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalSellers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingSellers: 0,
    approvedSellers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersSnapshot, sellersSnapshot, ordersSnapshot] = await Promise.all([
        getDocs(collection(db, 'userRoles')),
        getDocs(collection(db, 'sellers')),
        getDocs(collection(db, 'orders')),
      ]);

      const sellers = sellersSnapshot.docs.map(doc => doc.data());
      const orders = ordersSnapshot.docs.map(doc => doc.data());

      const totalRevenue = orders.reduce((sum, order: any) => sum + (order.total || 0), 0);

      setStats({
        totalUsers: usersSnapshot.size,
        totalSellers: sellersSnapshot.size,
        totalOrders: ordersSnapshot.size,
        totalRevenue,
        pendingSellers: sellers.filter((s: any) => s.status === 'pending').length,
        approvedSellers: sellers.filter((s: any) => s.status === 'approved').length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toString(),
      icon: Users,
      change: '+0%',
    },
    {
      title: 'Total Sellers',
      value: stats.totalSellers.toString(),
      icon: Store,
      change: `${stats.pendingSellers} pending`,
      changeColor: 'text-orange-600',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      change: '+0%',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+0%',
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
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-600 mt-1">System statistics and metrics</p>
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
                  <span className={stat.changeColor || 'text-green-600'}>{stat.change}</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {stats.pendingSellers > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-900">
              ⚠️ {stats.pendingSellers} Pending Seller Approval{stats.pendingSellers > 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-800 mb-3">
              You have seller applications waiting for review. Please review and approve or reject them.
            </p>
            <a
              href="/admin/sellers"
              className="text-sm font-medium text-orange-900 hover:text-orange-700 underline"
            >
              Review Pending Sellers →
            </a>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Approved Sellers</span>
                <span className="font-semibold">{stats.approvedSellers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Sellers</span>
                <span className="font-semibold text-orange-600">{stats.pendingSellers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Products</span>
                <span className="font-semibold">-</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 space-y-2">
              <a href="/admin/sellers" className="block hover:text-primary">
                → Manage pending seller approvals
              </a>
              <a href="/admin/users" className="block hover:text-primary">
                → View all users
              </a>
              <a href="/admin/orders" className="block hover:text-primary">
                → View recent orders
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

