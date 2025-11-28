import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchProductByIdFromFirestore } from '@/services/productService';
import type { Product } from '@/types/product';

export function useProductById(
  id: string | number
): UseQueryResult<Product | null, Error> {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductByIdFromFirestore(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    enabled: !!id && (typeof id === 'string' ? id.length > 0 : id > 0),
  });
}
