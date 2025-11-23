import {
  fetchAllProductsFromFirestore,
  getCategoriesFromProducts,
} from '@/services/productService';
import ProductsPageClient from '@/components/products/ProductsPageClient';

export const metadata = {
  title: 'Products | MyStore',
  description: 'Browse our wide selection of products',
};

interface ProductsPageProps {
  searchParams: Promise<{
    title?: string;
    price?: string;
    price_min?: string;
    price_max?: string;
    categoryId?: string;
    categorySlug?: string;
    offset?: string;
    limit?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await searchParams (Next.js 15 requirement)
  const params = await searchParams;
  
  // Build filters from search params
  const firestoreFilters: {
    title?: string;
    price_min?: number;
    price_max?: number;
    category?: string;
  } = {};

  if (params.title) firestoreFilters.title = params.title;
  if (params.price_min) firestoreFilters.price_min = parseFloat(params.price_min);
  if (params.price_max) firestoreFilters.price_max = parseFloat(params.price_max);
  if (params.categorySlug) {
    firestoreFilters.category = params.categorySlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Fetch products from Firestore
  const products = await fetchAllProductsFromFirestore(firestoreFilters);
  const categories = await getCategoriesFromProducts();

  // Get category name for display
  let categoryName = 'All Products';
  if (firestoreFilters.category) {
    categoryName = firestoreFilters.category;
  }

  // Convert filters for client component
  const filters = {
    title: params.title,
    price_min: params.price_min ? parseFloat(params.price_min) : undefined,
    price_max: params.price_max ? parseFloat(params.price_max) : undefined,
    categorySlug: params.categorySlug,
  };

  return (
    <ProductsPageClient
      products={products}
      categories={categories}
      categoryName={categoryName}
      filters={filters}
    />
  );
}
