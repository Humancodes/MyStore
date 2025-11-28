'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types/product';

// Lazy load HeroCarousel - only loads when needed
const HeroCarousel = dynamic(() => import('@/components/HeroCarousel'), {
  loading: () => (
    <div className="relative aspect-video w-full">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  ),
  ssr: false, // Carousel doesn't need SSR
});

interface HeroCarouselClientProps {
  products: Product[];
}

export default function HeroCarouselClient({ products }: HeroCarouselClientProps) {
  return <HeroCarousel products={products} />;
}

