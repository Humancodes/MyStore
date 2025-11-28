'use client';

import { useAppSelector } from '@/store/hooks';
import ProductCard from '@/components/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-block mb-4 cursor-pointer">
            <Button variant="ghost" className="gap-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-1">
                {wishlistItems.length === 0
                  ? 'No items in your wishlist'
                  : `${wishlistItems.length} ${wishlistItems.length === 1 ? 'item' : 'items'} saved`}
              </p>
            </div>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Start adding products to your wishlist by clicking the heart icon on any product
            </p>
            <Link href="/products" className="cursor-pointer">
              <Button className="cursor-pointer">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

