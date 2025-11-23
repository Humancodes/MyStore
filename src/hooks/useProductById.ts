import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchProductById } from '@/services/fakeStoreApi';
import type { Product } from '@/types/product';

/**
 * useProductById - React Query hook for fetching a single product
 *
 * React Query Concepts:
 * - Query Key includes the product ID: ['product', id]
 * - Each product has its own cache entry
 * - If product is already cached, it returns immediately
 * - Background refetch keeps data fresh
 *
 * Usage:
 * ```tsx
 * const { data: product, isLoading, error } = useProductById(123);
 * ```
 */
export function useProductById(id: number): UseQueryResult<Product, Error> {
  return useQuery({
    // Query Key: ['product', id]
    // Each product ID has its own cache entry
    queryKey: ['product', id],

    // Query Function: Fetches single product
    queryFn: () => fetchProductById(id),

    // Product details might change, so keep it fresh
    // But still cache for 5 minutes (from default)
    staleTime: 1000 * 60 * 5, // 5 minutes

    // Only fetch if ID is valid
    enabled: !!id && id > 0,
  });
}

