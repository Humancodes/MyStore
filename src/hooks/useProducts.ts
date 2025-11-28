import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchAllProductsFromFirestore } from '@/services/productService';
import type { Product, ProductFilters } from '@/types/product';

export function useProducts(
  filters: ProductFilters = {}
): UseQueryResult<Product[], Error> {
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
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
  });
}
