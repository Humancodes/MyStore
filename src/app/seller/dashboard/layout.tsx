'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingBag, BarChart3, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/components/ProtectedRoute';

const navigation = [
  { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/seller/dashboard/products', icon: Package },
  { name: 'Orders', href: '/seller/dashboard/orders', icon: ShoppingBag },
  { name: 'Analytics', href: '/seller/dashboard/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/seller/dashboard/profile', icon: User },
  { name: 'Settings', href: '/seller/dashboard/settings', icon: Settings },
];

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ProtectedRoute allowedRoles={['seller', 'admin']} requireAuth>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Manage your products, orders, and business analytics
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>

            <main className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

