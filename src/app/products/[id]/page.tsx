import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchProductById, fetchAllProducts } from '@/services/fakeStoreApi';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductHighlights from '@/components/product/ProductHighlights';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductDescription from '@/components/product/ProductDescription';
import SimilarProducts from '@/components/product/SimilarProducts';
import type { Product } from '@/types/product';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return {
      title: 'Product Not Found | MyStore',
      description: 'The product you are looking for does not exist',
    };
  }

  try {
    const product = await fetchProductById(productId);
    return {
      title: `${product.title} | MyStore`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch {
    return {
      title: 'Product Not Found | MyStore',
      description: 'The product you are looking for does not exist',
    };
  }
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    notFound();
  }

  let product: Product;
  try {
    product = await fetchProductById(productId);
  } catch (error) {
    notFound();
  }

  // Fetch similar products (same category, excluding current product)
  const allProducts = await fetchAllProducts();
  const similarProducts = allProducts
    .filter(
      (p) =>
        p.category.toLowerCase() === product.category.toLowerCase() &&
        p.id !== product.id
    )
    .slice(0, 8);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.category, href: `/products?categorySlug=${product.category.toLowerCase().replace(/\s+/g, '-')}` },
    { label: product.title, href: `#` },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Product Section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-5">
            <ProductImageGallery product={product} />
          </div>

          {/* Center Column - Product Info */}
          <div className="lg:col-span-4">
            <ProductInfo product={product} />
          </div>

          {/* Right Column - Highlights & Additional Info */}
          <div className="lg:col-span-3">
            <ProductHighlights product={product} />
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-8">
          <ProductDescription product={product} />
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <SimilarProducts products={similarProducts} />
          </div>
        )}
      </div>
    </div>
  );
}

