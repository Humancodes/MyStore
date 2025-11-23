'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <p className="text-gray-600 mt-1">View and manage all orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            Order management coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

