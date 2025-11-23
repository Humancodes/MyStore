'use client';

import { ShoppingCart, X } from 'lucide-react';
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
import { clearCart } from '@/store/slices/cartSlice';
import CartItem from './CartItem';
import Link from 'next/link';

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  // Read cart state from store
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);
  
  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      // Dispatch action to clear cart
      dispatch(clearCart());
    }
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="gap-2 cursor-pointer relative">
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </div>
          <span className="hidden sm:inline">Cart</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 
              ? 'Your cart is empty' 
              : `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link href="/products">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
                <Link href="/checkout" className="flex-1">
                  <Button className="w-full">Checkout</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

