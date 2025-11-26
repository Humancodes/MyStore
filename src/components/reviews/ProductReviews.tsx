'use client';

import { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

interface ProductReviewsProps {
  productId: string;
  productTitle: string;
}

export default function ProductReviews({
  productId,
  productTitle,
}: ProductReviewsProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewSubmitted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      <ReviewsList key={refreshKey} productId={productId} />
      <ReviewForm
        productId={productId}
        productTitle={productTitle}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}

