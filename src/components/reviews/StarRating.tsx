'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
  readOnly?: boolean;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  className,
  readOnly = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (interactive) {
    }
  };

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Math.round(rating);
        const isHalfFilled = starValue - 0.5 <= rating && rating < starValue;

        const StarIcon = (
          <Star
            className={cn(
              sizeClasses[size],
              isFilled
                ? 'fill-yellow-400 text-yellow-400'
                : isHalfFilled
                ? 'fill-yellow-200 text-yellow-400'
                : 'fill-gray-200 text-gray-300'
            )}
          />
        );

        if (readOnly || !interactive) {
          return (
            <span
              key={index}
              className="transition-colors"
              aria-label={`${starValue} star${starValue === 1 ? '' : 's'}`}
            >
              {StarIcon}
            </span>
          );
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            className={cn(
              'transition-colors cursor-pointer hover:scale-110'
            )}
            aria-label={`${starValue} star${starValue === 1 ? '' : 's'}`}
          >
            {StarIcon}
          </button>
        );
      })}
      {!interactive && (
        <span className="ml-1 text-sm text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

