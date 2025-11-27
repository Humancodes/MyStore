'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User, ShoppingBag, Heart, Store, LayoutDashboard } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout as logoutAction } from '@/store/slices/authSlice';
import { logout } from '@/services/authService';
import { useRole } from '@/hooks/useRole';
import { useNotification, notificationMessages } from '@/hooks/useNotification';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function UserMenu() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const notify = useNotification();
  const user = useAppSelector((state) => state.auth.user);
  const { isSeller, isAdmin } = useRole();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutAction());
      notify.success(notificationMessages.auth.logoutSuccess);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      notify.error(notificationMessages.auth.logoutError);
    }
  };

  if (!user) return null;

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 cursor-pointer hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors data-[state=open]:bg-gray-50"
        >
          <Avatar className="h-8 w-8 pointer-events-none">
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-gray-700">
            {user.displayName || user.email?.split('@')[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              {user.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/buyer/dashboard')}>
          <User className="mr-2 h-4 w-4" />
          <span>My Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/buyer/dashboard/orders')}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>My Orders</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/wishlist')}>
          <Heart className="mr-2 h-4 w-4" />
          <span>Wishlist</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isSeller && (
          <DropdownMenuItem onClick={() => router.push('/seller/dashboard')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Seller Dashboard</span>
          </DropdownMenuItem>
        )}
        {!isSeller && !isAdmin && (
          <DropdownMenuItem onClick={() => router.push('/seller/register')}>
            <Store className="mr-2 h-4 w-4" />
            <span>Become a Seller</span>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={() => router.push('/admin')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Admin Dashboard</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

