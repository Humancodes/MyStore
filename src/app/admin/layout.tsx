'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Store, ShoppingBag, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/components/ProtectedRoute';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Sellers', href: '/admin/sellers', icon: Store },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ProtectedRoute allowedRoles={['admin']} requireAuth>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Manage users, sellers, and system settings
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

