'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <p className="text-gray-600 mt-1">Manage user accounts and roles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            User management coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

