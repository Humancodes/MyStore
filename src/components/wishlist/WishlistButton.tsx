'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import type { Product } from '@/types/product';

interface WishlistButtonProps {
  product: Product;
  variant?: 'default' | 'icon' | 'ghost';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

export default function WishlistButton({
  product,
  variant = 'ghost',
  size = 'icon',
  className = '',
  showText = false,
}: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWishlist}
      className={`cursor-pointer ${className}`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`${showText ? 'mr-2' : ''} h-4 w-4 ${
          isInWishlist
            ? 'fill-red-500 text-red-500'
            : 'text-gray-600'
        } transition-all`}
      />
      {showText && (
        <span className="text-sm">
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </span>
      )}
    </Button>
  );
}

