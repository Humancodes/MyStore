import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/fakeStoreApi';
import type { Product, ProductFilters } from '@/types/product';

/**
 * useProducts - React Query hook for fetching products
 *
 * React Query Concepts:
 * - useQuery: Hook for fetching data (GET requests)
 * - Query Key: Unique identifier for cached data ['products', filters]
 * - Query Function: Async function that fetches data
 * - Automatic Features:
 *   - Caching: Data is cached and reused
 *   - Background Refetching: Updates data in background
 *   - Loading States: isLoading, isFetching, isError
 *   - Error Handling: Automatic error state
 *
 * Usage:
 * ```tsx
 * const { data: products, isLoading, error } = useProducts({ categorySlug: 'electronics' });
 * ```
 */
export function useProducts(
  filters: ProductFilters = {}
): UseQueryResult<Product[], Error> {
  return useQuery({
    // Query Key: Unique identifier for this query
    // Changing filters creates a new cache entry
    // Example: ['products', { categorySlug: 'electronics' }]
    queryKey: ['products', filters],

    // Query Function: Fetches the data
    // React Query calls this function and caches the result
    queryFn: () => fetchAllProducts(filters),

    // Optional: Additional options
    // staleTime and cacheTime are inherited from QueryClient defaults
    // But you can override them per query if needed
  });
}

/**
 * useProductsInfinite - For infinite scrolling/pagination
 * (Optional - can be implemented later if needed)
 */
// export function useProductsInfinite(filters: ProductFilters = {}) {
//   return useInfiniteQuery({
//     queryKey: ['products', 'infinite', filters],
//     queryFn: ({ pageParam = 0 }) => fetchAllProducts({ ...filters, offset: pageParam }),
//     getNextPageParam: (lastPage, allPages) => {
//       return lastPage.length > 0 ? allPages.length * 20 : undefined;
//     },
//   });
// }

