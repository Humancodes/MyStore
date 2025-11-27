'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StarRating from './StarRating';
import { useReviews, calculateAverageRating, getRatingDistribution } from '@/hooks/useReviews';
import { useAppSelector } from '@/store/hooks';
import { FirestoreService } from '@/services/firestoreService';
import { useNotification, notificationMessages } from '@/hooks/useNotification';
import { ThumbsUp, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react';
import type { Review } from '@/types/firestore';
import { formatDistanceToNow } from 'date-fns';

interface ReviewsListProps {
  productId: string;
}

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'most-helpful';

export default function ReviewsList({ productId }: ReviewsListProps) {
  const user = useAppSelector((state) => state.auth.user);
  const notify = useNotification();
  const { data: reviews = [], isLoading, refetch } = useReviews(productId);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const sortedAndFilteredReviews = [...reviews]
    .filter((review) => filterRating === 'all' || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (
            (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)
          );
        case 'oldest':
          return (
            (a.createdAt?.toMillis?.() || 0) - (b.createdAt?.toMillis?.() || 0)
          );
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'most-helpful':
          return b.helpfulCount - a.helpfulCount;
        default:
          return 0;
      }
    });

  const averageRating = calculateAverageRating(reviews);
  const ratingDistribution = getRatingDistribution(reviews);
  const totalReviews = reviews.length;

  const handleHelpful = async (reviewId: string) => {
    if (!user) {
      notify.error(notificationMessages.review.loginRequired);
      return;
    }

    try {
      const review = reviews.find((r) => r.id === reviewId);
      if (review) {
        await FirestoreService.updateReview(reviewId, {
          helpfulCount: review.helpfulCount + 1,
        });
        refetch();
        notify.success('Thank you for your feedback!');
      }
    } catch (error) {
      console.error('Error marking review as helpful:', error);
      notify.error('Failed to update review');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Recently';
    try {
      const date =
        typeof timestamp.toDate === 'function'
          ? timestamp.toDate()
          : timestamp.seconds
          ? new Date(timestamp.seconds * 1000)
          : new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Customer Reviews</CardTitle>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={averageRating} size="lg" />
                  <span className="text-lg font-semibold">
                    {averageRating.toFixed(1)} out of 5
                  </span>
                </div>
                <span className="text-gray-600">
                  {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[rating];
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div
                    key={rating}
                    onClick={() =>
                      setFilterRating(filterRating === rating ? 'all' : rating)
                    }
                    className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium w-8">{rating}</span>
                    <StarRating rating={1} size="sm" readOnly={true} />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {sortedAndFilteredReviews.length} Review
          {sortedAndFilteredReviews.length !== 1 ? 's' : ''}
        </h3>
        <div className="flex items-center gap-4">
          <Select value={filterRating.toString()} onValueChange={(value) => setFilterRating(value === 'all' ? 'all' : Number(value))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="most-helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedAndFilteredReviews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">No reviews found</p>
            </CardContent>
          </Card>
        ) : (
          sortedAndFilteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onHelpful={() => handleHelpful(review.id)}
              formatDate={formatDate}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
  onHelpful: () => void;
  formatDate: (timestamp: any) => string;
}

function ReviewCard({ review, onHelpful, formatDate }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={review.buyerPhoto} />
            <AvatarFallback>
              {review.buyerName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{review.buyerName}</h4>
                  {review.verifiedPurchase && (
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="text-sm text-gray-600">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {review.title && (
              <h5 className="font-medium mt-3 mb-2">{review.title}</h5>
            )}

            <p className="text-gray-700 mt-2 whitespace-pre-wrap">
              {review.comment}
            </p>

            {review.sellerResponse && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-900">
                    Seller Response
                  </span>
                  <span className="text-xs text-blue-600">
                    {formatDate(review.sellerResponse.respondedAt)}
                  </span>
                </div>
                <p className="text-blue-800">{review.sellerResponse.message}</p>
              </div>
            )}

            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onHelpful}
                className="text-gray-600"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful ({review.helpfulCount})
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

