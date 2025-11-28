'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, User, Store, Menu, Heart, ShoppingBag, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout as logoutAction } from '@/store/slices/authSlice';
import { logout } from '@/services/authService';
import { useNotification } from '@/hooks/useNotification';
import { useRole } from '@/hooks/useRole';
import CartIcon from '@/components/cart/CartIcon';
import UserMenu from '@/components/layout/UserMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import SearchBar from '@/components/search/SearchBar';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const notify = useNotification();
  const { isSeller, isAdmin } = useRole();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;
  const user = useAppSelector((state) => state.auth.user);
  const authLoading = useAppSelector((state) => state.auth.loading);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutAction());
      notify.success('Logged out successfully');
      setMobileMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      notify.error('Failed to logout');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-2 cursor-pointer shrink-0">
            <div className="text-xl sm:text-2xl font-bold text-primary">MyStore</div>
            <span className="hidden text-xs text-primary md:block">
              Explore Plus +
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <SearchBar className="w-full" />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />

            <Sheet open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Search Products</SheetTitle>
                  <SheetDescription>
                    Find products by name, brand, or category
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <SearchBar
                    onSearch={() => setMobileSearchOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {!authLoading && (
              <>
                {user ? (
                  <div className="hidden md:block">
                    <UserMenu />
                  </div>
                ) : (
                  <Link href="/login" className="hidden md:block cursor-pointer">
                    <Button variant="ghost" className="gap-2 cursor-pointer">
                      <User className="h-5 w-5" />
                      <span>Login</span>
                    </Button>
                  </Link>
                )}
              </>
            )}

            <Link href="/wishlist" className="cursor-pointer">
              <Button variant="ghost" size="icon" className="relative cursor-pointer">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            <CartIcon />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {!authLoading && (
                    <>
                      {user ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 px-3 py-2 border-b">
                            <div className="flex-1">
                              <p className="font-medium">{user.displayName || user.email}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <Link
                            href="/buyer/dashboard"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <User className="h-5 w-5" />
                            <span>My Account</span>
                          </Link>
                          <Link
                            href="/buyer/dashboard/orders"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <ShoppingBag className="h-5 w-5" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            href="/wishlist"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <Heart className="h-5 w-5" />
                            <span>Wishlist</span>
                          </Link>
                          {isSeller && (
                            <Link
                              href="/seller/dashboard"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <LayoutDashboard className="h-5 w-5" />
                              <span>Seller Dashboard</span>
                            </Link>
                          )}
                          {isAdmin && (
                            <Link
                              href="/admin"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <LayoutDashboard className="h-5 w-5" />
                              <span>Admin Dashboard</span>
                            </Link>
                          )}
                          <div className="border-t pt-2 mt-2">
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left text-red-600"
                            >
                              <LogOut className="h-5 w-5" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <User className="h-5 w-5" />
                          <span>Login</span>
                        </Link>
                      )}
                    </>
                  )}

                  <div className="border-t pt-4">
                    <p className="px-3 text-sm font-semibold text-gray-500 uppercase mb-2">Categories</p>
                    <div className="space-y-1">
                      <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span>🛍️</span>
                        <span>All Products</span>
                      </Link>
                      <Link
                        href="/products?categorySlug=clothes"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span>👔</span>
                        <span>Clothes</span>
                      </Link>
                      <Link
                        href="/products?categorySlug=electronics"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span>📱</span>
                        <span>Electronics</span>
                      </Link>
                      <Link
                        href="/products?categorySlug=furniture"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span>🏠</span>
                        <span>Furniture</span>
                      </Link>
                      <Link
                        href="/products?categorySlug=shoes"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span>👟</span>
                        <span>Shoes</span>
                      </Link>
                      <Link
                        href="/products?categorySlug=others"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span>💎</span>
                        <span>Others</span>
                      </Link>
                    </div>
                  </div>

                  {user && user.roles && !user.roles.seller && (
                    <div className="border-t pt-4">
                      <Link
                        href="/seller/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Store className="h-5 w-5" />
                        <span>Become a Seller</span>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="hidden md:block border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-4 overflow-x-auto py-2 scrollbar-hide">
            <Link
              href="/products"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer"
            >
              <span>🛍️</span>
              <span>All Products</span>
            </Link>
            <Link
              href="/products?categorySlug=clothes"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer"
            >
              <span>👔</span>
              <span>Clothes</span>
            </Link>
            <Link
              href="/products?categorySlug=electronics"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer"
            >
              <span>📱</span>
              <span>Electronics</span>
            </Link>
            <Link
              href="/products?categorySlug=furniture"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer"
            >
              <span>🏠</span>
              <span>Furniture</span>
            </Link>
            <Link
              href="/products?categorySlug=shoes"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer"
            >
              <span className="text-lg">👟</span>
              <span>Shoes</span>
            </Link>
            <Link
              href="/products?categorySlug=others"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer"
            >
              <span className="text-lg">💎</span>
              <span>Others</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
