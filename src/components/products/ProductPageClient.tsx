'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useProductById } from '@/hooks/useProductById';
import { useProducts } from '@/hooks/useProducts';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductHighlights from '@/components/product/ProductHighlights';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductDescription from '@/components/product/ProductDescription';
import SimilarProducts from '@/components/product/SimilarProducts';
import ProductReviews from '@/components/reviews/ProductReviews';
import ProductStructuredData from './ProductStructuredData';
import { Loader2 } from 'lucide-react';

interface ProductPageClientProps {
  productId: string | number;
}

export default function ProductPageClient({ productId }: ProductPageClientProps) {
  const router = useRouter();
  
  const { data: product, isLoading, error, isFetching } = useProductById(productId);

  const similarProductsQuery = useProducts(
    useMemo(
      () => ({
        categorySlug: product?.category
          ?.toLowerCase()
          .replace(/\s+/g, '-'),
      }),
      [product?.category]
    )
  );

  if (isLoading && product === undefined) {
    return (
      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-red-500">Error loading product: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The product you are looking for does not exist.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allSimilarProducts = similarProductsQuery.data ?? [];
  const similarProducts = allSimilarProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 8);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    {
      label: product.category,
      href: `/products?categorySlug=${product.category.toLowerCase().replace(/\s+/g, '-')}`,
    },
    { label: product.title, href: `#` },
  ];

  return (
    <>
      <ProductStructuredData product={product} />
      {isFetching && product && (
        <div className="fixed top-20 right-4 z-50 bg-primary/90 text-white px-3 py-1 rounded-full text-xs shadow-lg animate-pulse">
          Updating...
        </div>
      )}
      <div className="min-h-screen bg-muted">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ProductImageGallery product={product} />
            </div>

            <div className="lg:col-span-4">
              <ProductInfo product={product} />
            </div>

            <div className="lg:col-span-3">
              <ProductHighlights product={product} />
            </div>
          </div>

          <div className="mt-8">
            <ProductDescription product={product} />
          </div>

          <div className="mt-12">
            <ProductReviews
              productId={String(product.id)}
              productTitle={product.title}
            />
          </div>

          {similarProducts.length > 0 && (
            <div className="mt-12">
              <SimilarProducts products={similarProducts} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

