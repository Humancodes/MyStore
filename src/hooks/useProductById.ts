import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchProductByIdFromFirestore } from '@/services/productService';
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
 * const { data: product, isLoading, error } = useProductById('product-id');
 * ```
 */
export function useProductById(
  id: string | number
): UseQueryResult<Product | null, Error> {
  return useQuery({
    // Query Key: ['product', id]
    // Each product ID has its own cache entry
    queryKey: ['product', id],

    // Query Function: Fetches single product from Firestore
    queryFn: () => fetchProductByIdFromFirestore(id),

    // Product details stay fresh for 10 minutes
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer
    refetchOnMount: false, // Don't refetch if cached data exists - instant loading

    // Only fetch if ID is valid
    enabled: !!id && (typeof id === 'string' ? id.length > 0 : id > 0),
  });
}
