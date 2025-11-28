'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';

export default function CartIcon() {
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  
  return (
    <Link href="/cart" className="cursor-pointer">
      <Button variant="ghost" size="icon" className="relative cursor-pointer">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
        <span className="sr-only">Cart</span>
      </Button>
    </Link>
  );
}

