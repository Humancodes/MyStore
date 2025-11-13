'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useState } from 'react';
import WishlistButton from '@/components/wishlist/WishlistButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const placeholder = `https://via.placeholder.com/400x400/e5e7eb/6b7280?text=${encodeURIComponent(product.title.slice(0, 15))}`;

  return (
    <Link href={`/products/${product.id}`} className="cursor-pointer">
      <Card className="group h-full flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-square overflow-hidden rounded-t-lg bg-gray-100">
            <Image
              src={imgError ? placeholder : product.image}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
              unoptimized={imgError}
            />
            {/* Wishlist Button - Top Right */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <WishlistButton
                product={product}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <CardTitle className="text-lg line-clamp-2 mb-2 text-gray-900">
            {product.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 mb-4 flex-1 text-gray-600">
            {product.description}
          </CardDescription>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {product.rating.rate.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              ({product.rating.count})
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full">
            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 capitalize mt-1">
              {product.category}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
