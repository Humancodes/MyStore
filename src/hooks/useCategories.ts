import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCategoriesFromProducts } from '@/services/productService';
import type { Category } from '@/types/product';

export function useCategories(): UseQueryResult<Category[], Error> {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategoriesFromProducts(),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}
