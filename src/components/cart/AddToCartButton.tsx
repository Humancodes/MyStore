'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import type { Product } from '@/types/product';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  className?: string;
  showIcon?: boolean;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = 'default',
  size = 'default',
  className = '',
  showIcon = true,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  
  const cartItems = useAppSelector((state) => state.cart.items);
  
  const isInCart = cartItems.some((item) => item.id === product.id);
  const cartItem = cartItems.find((item) => item.id === product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addToCart({ product, quantity }));
    console.log(`Added ${quantity} ${product.title} to cart!`);
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      className={`cursor-pointer ${className}`}
      aria-label={isInCart ? 'Update cart' : 'Add to cart'}
    >
      {showIcon && <ShoppingCart className="mr-2 h-4 w-4" />}
      {isInCart ? `Update Cart (${cartItem?.quantity || 0})` : 'Add to Cart'}
    </Button>
  );
}

