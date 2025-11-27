'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { useNotification, notificationMessages } from '@/hooks/useNotification';
import type { Product } from '@/types/product';

interface WishlistButtonProps {
  product: Product;
  variant?: 'default' | 'ghost' | 'outline';
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
  const notify = useNotification();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
        notify.success(notificationMessages.wishlist.removed(product.title));
      } else {
        dispatch(addToWishlist(product));
        notify.success(notificationMessages.wishlist.added(product.title), {
          action: {
            label: 'View Wishlist',
            onClick: () => window.location.href = '/wishlist',
          },
        });
      }
    } catch (error) {
      notify.error(notificationMessages.wishlist.error);
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

