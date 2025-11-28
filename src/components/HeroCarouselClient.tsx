'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types/product';

const HeroCarousel = dynamic(() => import('@/components/HeroCarousel'), {
  loading: () => (
    <div className="relative aspect-video w-full">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  ),
  ssr: false,
});

interface HeroCarouselClientProps {
  products: Product[];
}

export default function HeroCarouselClient({ products }: HeroCarouselClientProps) {
  return <HeroCarousel products={products} />;
}

