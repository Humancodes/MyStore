'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import StarRating from './StarRating';
import { useAppSelector } from '@/store/hooks';
import { FirestoreService } from '@/services/firestoreService';
import { useNotification, notificationMessages } from '@/hooks/useNotification';
import { Loader2 } from 'lucide-react';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100).optional(),
  comment: z.string().min(10, 'Review must be at least 10 characters').max(1000),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  productId: string;
  productTitle: string;
  onReviewSubmitted?: () => void;
}

export default function ReviewForm({
  productId,
  productTitle,
  onReviewSubmitted,
}: ReviewFormProps) {
  const user = useAppSelector((state) => state.auth.user);
  const notify = useNotification();
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: '',
      comment: '',
    },
  });

  const handleRatingChange = (value: number) => {
    setRating(value);
    form.setValue('rating', value, { shouldValidate: true });
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (!user) {
      notify.error(notificationMessages.review.loginRequired);
      return;
    }

    const finalRating = rating || data.rating;
    if (finalRating === 0) {
      notify.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      await FirestoreService.createReview({
        productId,
        buyerId: user.uid,
        buyerName: user.displayName || user.email || 'Anonymous',
        buyerPhoto: user.photoURL || undefined,
        rating: finalRating,
        title: data.title || undefined,
        comment: data.comment,
        verifiedPurchase: false,
      });

      notify.success(notificationMessages.review.submitted);
      form.reset();
      setRating(0);
      onReviewSubmitted?.();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      notify.error(error.message || notificationMessages.review.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-center text-gray-600">
            Please{' '}
            <a href="/login" className="text-primary hover:underline">
              login
            </a>{' '}
            to write a review
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>Share your experience with {productTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Rating *</Label>
            <div className="mt-2">
              <StarRating
                rating={rating}
                interactive={true}
                onRatingChange={handleRatingChange}
                size="lg"
              />
            </div>
            {form.formState.errors.rating && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.rating.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="title">Review Title (Optional)</Label>
            <Input
              id="title"
              {...form.register('title')}
              placeholder="e.g., Great product!"
              className="mt-1"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              {...form.register('comment')}
              placeholder="Share your thoughts about this product..."
              className="mt-1 min-h-[120px]"
            />
            {form.formState.errors.comment && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.comment.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Review'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

