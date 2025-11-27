'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useDebounce } from '@/hooks/useDebounce';
import ProductCard from '@/components/ProductCard';
import { addToSearchHistory } from '@/utils/searchHistory';
import { Loader2, Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Update search query when URL param changes
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  // Add to search history when query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      addToSearchHistory(debouncedQuery);
    }
  }, [debouncedQuery]);

  const { data: products, isLoading, error } = useSearch(debouncedQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {debouncedQuery ? (
            <>
              Search Results for{' '}
              <span className="text-primary">
                &quot;{debouncedQuery}&quot;
              </span>
            </>
          ) : (
            'Search Products'
          )}
        </h1>
        {debouncedQuery && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLoading ? (
              'Searching...'
            ) : products ? (
              <>
                Found <strong>{products.length}</strong>{' '}
                {products.length === 1 ? 'product' : 'products'}
              </>
            ) : null}
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Searching products...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Search Error
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {error.message || 'An error occurred while searching. Please try again.'}
          </p>
        </div>
      )}

      {/* No Query State */}
      {!debouncedQuery && !isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Start Searching
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
            Enter a search query in the search bar above to find products.
          </p>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && !error && debouncedQuery && products && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <SearchIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Products Found
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
            We couldn&apos;t find any products matching &quot;
            <span className="font-semibold">{debouncedQuery}</span>&quot;. Try
            different keywords or check your spelling.
          </p>
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && !error && products && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard 
                  product={product} 
                  highlightQuery={debouncedQuery}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

