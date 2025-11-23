'use client';

import { useAppSelector } from '@/store/hooks';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, User, Shield, Calendar, ShoppingBag, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BuyerDashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  if (!user) {
    return null;
  }

  const getInitials = () => {
    if (user.displayName) {
      return user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email?.[0].toUpperCase() || 'U';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Account Overview</h2>
          <p className="text-gray-600 mt-1">View and manage your account information</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your personal account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gray-200 text-gray-700 text-lg">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">
                  {user.displayName || 'User'}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Email Verification</p>
                  <p className="text-sm text-gray-600">
                    {user.emailVerified ? (
                      <span className="text-green-600">Verified</span>
                    ) : (
                      <span className="text-yellow-600">Not Verified</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Account Activity
            </CardTitle>
            <CardDescription>Recent account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Account Created</span>
                <span className="text-sm font-medium">Recently</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-medium">2024</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/buyer/dashboard/orders')}
              >
                View Order History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common account tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
              onClick={() => router.push('/buyer/dashboard/orders')}
            >
              <ShoppingBag className="h-5 w-5 mb-2" />
              <span className="font-medium">My Orders</span>
              <span className="text-xs text-gray-500 mt-1">Track your orders</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
              onClick={() => router.push('/wishlist')}
            >
              <Heart className="h-5 w-5 mb-2" />
              <span className="font-medium">Wishlist</span>
              <span className="text-xs text-gray-500 mt-1">View saved items</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
              onClick={() => router.push('/cart')}
            >
              <ShoppingBag className="h-5 w-5 mb-2" />
              <span className="font-medium">Shopping Cart</span>
              <span className="text-xs text-gray-500 mt-1">Continue shopping</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

