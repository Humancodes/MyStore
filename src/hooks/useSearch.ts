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

      const products = await fetchAllProductsFromFirestore({
        title: query.trim(),
        status: 'active',
      });

      return products;
    },
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

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

      return products.slice(0, limit);
    },
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000,
  });
}
