'use client';

import { useEffect } from 'react';
import type { Product } from '@/types/product';

interface ProductStructuredDataProps {
  product: Product;
}

export default function ProductStructuredData({ product }: ProductStructuredDataProps) {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mystore.com';
    const productUrl = `${baseUrl}/products/${product.id}`;
    const productImage = product.images && product.images.length > 0 ? product.images[0] : product.image;

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: productImage,
      sku: String(product.id),
      offers: {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: 'USD',
        price: product.price,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.rate,
        reviewCount: product.rating.count,
      },
      brand: {
        '@type': 'Brand',
        name: 'MyStore',
      },
      category: product.category,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'product-structured-data';
    
    const existingScript = document.getElementById('product-structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('product-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [product]);

  return null;
}

