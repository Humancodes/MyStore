import { fetchAllProducts, fetchCategories } from '@/services/fakeStoreApi';
import ProductsGrid from '@/components/products/ProductsGrid';
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
  const filters: {
    title?: string;
    price?: number;
    price_min?: number;
    price_max?: number;
    categoryId?: number;
    categorySlug?: string;
    offset?: number;
    limit?: number;
  } = {};

  if (params.title) filters.title = params.title;
  if (params.price) filters.price = parseFloat(params.price);
  if (params.price_min) filters.price_min = parseFloat(params.price_min);
  if (params.price_max) filters.price_max = parseFloat(params.price_max);
  if (params.categoryId) filters.categoryId = parseInt(params.categoryId);
  if (params.categorySlug) filters.categorySlug = params.categorySlug;
  if (params.offset) filters.offset = parseInt(params.offset);
  if (params.limit) filters.limit = parseInt(params.limit);

  // Fetch products with filters
  const products = await fetchAllProducts(filters);
  const categories = await fetchCategories();

  // Get category name for display
  let categoryName = 'All Products';
  if (filters.categoryId) {
    const category = categories.find((c) => c.id === filters.categoryId);
    categoryName = category?.name || 'Products';
  } else if (filters.categorySlug) {
    const category = categories.find((c) => c.slug === filters.categorySlug);
    categoryName = category?.name || 'Products';
  }

  return (
    <ProductsPageClient
      products={products}
      categories={categories}
      categoryName={categoryName}
      filters={filters}
    />
  );
}
