import type { Metadata } from 'next';
import { fetchProductByIdFromFirestore } from '@/services/productService';
import ProductPageClient from '@/components/products/ProductPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const productId = isNaN(Number(id)) ? id : Number(id);
    const product = await fetchProductByIdFromFirestore(productId);
    if (!product) {
      return {
        title: 'Product Not Found | MyStore',
        description: 'The product you are looking for does not exist',
      };
    }
    const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mystore.com'}/products/${product.id}`;
    const productImage = product.images && product.images.length > 0 ? product.images[0] : product.image;

    return {
      title: `${product.title} | MyStore`,
      description: product.description,
      alternates: {
        canonical: productUrl,
      },
      openGraph: {
        title: product.title,
        description: product.description,
        url: productUrl,
        siteName: 'MyStore',
        images: productImage ? [productImage] : [],
        type: 'website',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description,
        images: productImage ? [productImage] : [],
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
  const productId = isNaN(Number(id)) ? id : Number(id);

  return <ProductPageClient productId={productId} />;
}

