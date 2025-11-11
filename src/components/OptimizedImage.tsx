'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  priority = false,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Fallback placeholder image
  const placeholder = `https://via.placeholder.com/400x400/cccccc/666666?text=${encodeURIComponent(alt.slice(0, 20))}`;

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(placeholder);
    }
  };

  if (fill) {
    return (
      <Image
        src={hasError ? placeholder : imgSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        unoptimized={hasError}
      />
    );
  }

  return (
    <Image
      src={hasError ? placeholder : imgSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleError}
      unoptimized={hasError}
    />
  );
}
