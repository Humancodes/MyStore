'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import ProductsPageClient from '@/components/products/ProductsPageClient';
import { Loader2 } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  
  const filters = useMemo(() => {
    const filterObj: {
      title?: string;
      price_min?: number;
      price_max?: number;
      categorySlug?: string;
    } = {};

    const title = searchParams.get('title');
    const priceMin = searchParams.get('price_min');
    const priceMax = searchParams.get('price_max');
    const categorySlug = searchParams.get('categorySlug');

    if (title) filterObj.title = title;
    if (priceMin) filterObj.price_min = parseFloat(priceMin);
    if (priceMax) filterObj.price_max = parseFloat(priceMax);
    if (categorySlug) filterObj.categorySlug = categorySlug;

    return filterObj;
  }, [searchParams]);

  const { data, isLoading, error, isFetching } = useProducts(filters);
  
  const products = data ?? [];
  
  const categories: Array<{ id: number; name: string; slug: string; image: string }> = [];
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
  uniqueCategories.forEach((cat, index) => {
    categories.push({
      id: index + 1,
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, '-'),
      image: `https://placehold.co/600x400?text=${encodeURIComponent(cat)}`,
    });
  });

  const categoryName = filters.categorySlug
    ? filters.categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'All Products';

  if (isLoading && data === undefined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500">Error loading products: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isFetching && data && data.length > 0 && (
        <div className="fixed top-20 right-4 z-50 bg-primary/90 text-white px-3 py-1 rounded-full text-xs shadow-lg animate-pulse">
          Updating...
        </div>
      )}
      <ProductsPageClient
        products={products}
        categories={categories}
        categoryName={categoryName}
        filters={filters}
      />
    </>
  );
}
