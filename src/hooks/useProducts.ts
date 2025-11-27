import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchAllProductsFromFirestore } from '@/services/productService';
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
  // Convert ProductFilters to Firestore filters
  const firestoreFilters: {
    title?: string;
    price_min?: number;
    price_max?: number;
    category?: string;
    status?: 'active' | 'inactive' | 'out_of_stock';
  } = {};

  if (filters.title) firestoreFilters.title = filters.title;
  if (filters.price_min !== undefined)
    firestoreFilters.price_min = filters.price_min;
  if (filters.price_max !== undefined)
    firestoreFilters.price_max = filters.price_max;
  if (filters.categorySlug) {
    firestoreFilters.category = filters.categorySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return useQuery({
    queryKey: ['products', firestoreFilters],
    queryFn: () =>
      fetchAllProductsFromFirestore({
        ...firestoreFilters,
        status: 'active',
      }),
    staleTime: 10 * 60 * 1000, // 10 minutes - data stays fresh longer
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer
    refetchOnMount: false, // Don't refetch if cached data exists - instant loading
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
