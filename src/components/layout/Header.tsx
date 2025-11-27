'use client';

import Link from 'next/link';
import { Search, User, Store, Menu, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAppSelector } from '@/store/hooks';
import CartIcon from '@/components/cart/CartIcon';
import UserMenu from '@/components/layout/UserMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import SearchBar from '@/components/search/SearchBar';
import { useState } from 'react';

export default function Header() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;
  const user = useAppSelector((state) => state.auth.user);
  const authLoading = useAppSelector((state) => state.auth.loading);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 shadow-sm">
      {/* Top Header Bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="text-2xl font-bold text-primary">MyStore</div>
            <span className="hidden text-xs text-primary sm:block">
              Explore Plus +
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden sm:flex">
            <SearchBar className="flex-1 max-w-2xl" />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Search */}
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

            {/* Login / User Menu */}
            {!authLoading && (
              <>
                {user ? (
                  <UserMenu />
                ) : (
                  <Link href="/login" className="hidden sm:block cursor-pointer">
                    <Button variant="ghost" className="gap-2 cursor-pointer">
                      <User className="h-5 w-5" />
                      <span>Login</span>
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Wishlist */}
            <Link href="/wishlist" className="cursor-pointer">
              <Button variant="ghost" className="gap-2 cursor-pointer relative">
                <div className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                      {wishlistCount > 99 ? '99+' : wishlistCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Wishlist</span>
              </Button>
            </Link>

            {/* Cart */}
            <CartIcon />

            {/* Become a Seller - Only show for non-sellers */}
            {user && user.roles && !user.roles.seller && (
              <Link href="/seller/register" className="hidden lg:block cursor-pointer">
                <Button variant="ghost" className="gap-2 cursor-pointer">
                  <Store className="h-5 w-5" />
                  <span>Become a Seller</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
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
