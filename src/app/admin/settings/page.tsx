'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage system settings and configuration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            Settings management coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

