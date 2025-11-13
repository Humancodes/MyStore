'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FilterSidebar from './FilterSidebar';
import ProductsGrid from './ProductsGrid';
import type { Product, Category } from '@/types/product';

interface ProductsPageClientProps {
  products: Product[];
  categories: Category[];
  categoryName: string;
  filters: {
    title?: string;
    price?: number;
    price_min?: number;
    price_max?: number;
    categoryId?: number;
    categorySlug?: string;
    offset?: number;
    limit?: number;
  };
}

export default function ProductsPageClient({
  products,
  categories,
  categoryName,
  filters,
}: ProductsPageClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters = Boolean(
    filters.title || filters.price_min || filters.price_max || filters.categoryId || filters.categorySlug
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="lg:w-80 shrink-0">
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {categoryName}
                </h1>
                <p className="text-muted-foreground">
                  {products.length} {products.length === 1 ? 'product' : 'products'} found
                  {hasActiveFilters && ' with current filters'}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.title && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Title: {filters.title}
                  </span>
                )}
                {(filters.price_min || filters.price_max) && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Price: ${filters.price_min || 0} - ${filters.price_max || '∞'}
                  </span>
                )}
                {(filters.categoryId || filters.categorySlug) && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Category: {categoryName}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Products Grid */}
          <ProductsGrid products={products} />
        </div>
      </div>
    </main>
  );
}

