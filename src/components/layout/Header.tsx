'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Store, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top Header Bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">MyStore</div>
            <span className="hidden text-xs text-yellow-500 sm:block">
              Explore Plus +
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative hidden flex-1 max-w-2xl sm:flex"
          >
            <Input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-l-md border-r-0 pr-10"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 h-10 rounded-l-none rounded-r-md"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Login */}
            <Button variant="ghost" className="hidden gap-2 sm:flex">
              <User className="h-5 w-5" />
              <span>Login</span>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" className="gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline">Cart</span>
              </Button>
            </Link>

            {/* Become a Seller */}
            <Link href="/seller/register" className="hidden lg:block">
              <Button variant="ghost" className="gap-2">
                <Store className="h-5 w-5" />
                <span>Become a Seller</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="border-t bg-white">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-4 overflow-x-auto py-2 scrollbar-hide">
            <Link
              href="/products?category=electronics"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <span>📱</span>
              <span>Mobiles & Tablets</span>
            </Link>
            <Link
              href="/products?category=men's clothing"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <span>👔</span>
              <span>Fashion</span>
            </Link>
            <Link
              href="/products?category=electronics"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <span>🎧</span>
              <span>Electronics</span>
            </Link>
            <Link
              href="/products?category=women's clothing"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <span>🏠</span>
              <span>Home & Furniture</span>
            </Link>
            <Link
              href="/products?category=jewelery"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <span>💎</span>
              <span>Jewelry</span>
            </Link>
            <Link
              href="/products"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <span>🛍️</span>
              <span>All Products</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
