'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreService } from '@/services/firestoreService';
import type { Review } from '@/types/firestore';

export function useReviews(productId: string) {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => FirestoreService.getReviewsByProduct(productId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      reviewData: Omit<
        Review,
        'id' | 'createdAt' | 'updatedAt' | 'helpfulCount'
      >
    ) => {
      return await FirestoreService.createReview(reviewData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.productId],
      });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewId,
      data,
    }: {
      reviewId: string;
      data: Partial<Review>;
    }) => {
      return await FirestoreService.updateReview(reviewId, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      return await FirestoreService.deleteReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

export function getRatingDistribution(
  reviews: Review[]
): Record<number, number> {
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++;
  });
  return distribution;
}
