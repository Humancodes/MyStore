import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchAllProductsFromFirestore } from '@/services/productService';
import type { Product } from '@/types/product';

export function useSearch(
  query: string,
  enabled: boolean = true
): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query.trim()) {
        return [];
      }

      // Fetch products with title filter
      const products = await fetchAllProductsFromFirestore({
        title: query.trim(),
        status: 'active',
      });

      return products;
    },
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes - search results can be cached
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache
  });
}

/**
 * useSearchSuggestions - Get product suggestions for autocomplete
 *
 * Fetches a limited number of products matching the query for autocomplete dropdown.
 *
 * @param query - The search query string
 * @param limit - Maximum number of suggestions (default: 5)
 * @returns React Query result with suggested products
 */
export function useSearchSuggestions(
  query: string,
  limit: number = 5
): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: ['search-suggestions', query, limit],
    queryFn: async () => {
      if (!query.trim()) {
        return [];
      }

      const products = await fetchAllProductsFromFirestore({
        title: query.trim(),
        status: 'active',
      });

      // Return limited results for autocomplete
      return products.slice(0, limit);
    },
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes - suggestions can be cached briefly
  });
}
