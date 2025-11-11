import { fetchAllProducts } from '@/services/fakeStoreApi';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Products | MyStore',
  description: 'Browse our wide selection of products',
};

export default async function ProductsPage() {
  const products = await fetchAllProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-muted-foreground">
          Discover {products.length} amazing products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}
    </main>
  );
}
