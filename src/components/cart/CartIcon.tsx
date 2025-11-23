'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';

export default function CartIcon() {
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  
  return (
    <Link href="/cart" className="cursor-pointer">
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
    </Link>
  );
}

