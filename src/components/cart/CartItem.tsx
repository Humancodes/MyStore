'use client';

import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import type { Product } from '@/types/product';

interface CartItemProps {
  item: Product & { quantity: number };
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  
  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove();
    } else {    
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };
  
  return (
    <div className="flex gap-4 p-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain rounded"
          sizes="96px"
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Price & Remove */}
      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-500"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

