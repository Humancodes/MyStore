import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchCategories } from '@/services/fakeStoreApi';
import type { Category } from '@/types/product';

/**
 * useCategories - React Query hook for fetching categories
 *
 * Categories don't change often, so we can cache them longer
 *
 * Usage:
 * ```tsx
 * const { data: categories, isLoading } = useCategories();
 * ```
 */
export function useCategories(): UseQueryResult<Category[], Error> {
  return useQuery({
    // Query Key: ['categories']
    // Categories are cached globally (no filters)
    queryKey: ['categories'],

    // Query Function: Fetches all categories
    queryFn: () => fetchCategories(),

    // Categories change rarely, so keep them fresh longer
    staleTime: 1000 * 60 * 30, // 30 minutes

    // Cache categories for 1 hour
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}

