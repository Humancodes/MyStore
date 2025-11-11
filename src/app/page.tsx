import Link from 'next/link';
import Image from 'next/image';
import { fetchAllProducts } from '@/services/fakeStoreApi';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';

export default async function HomePage() {
  // Fetch featured products (first 8 products)
  const allProducts = await fetchAllProducts();
  const featuredProducts = allProducts.slice(0, 8);
  const topDeals = allProducts.slice(8, 14);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                Welcome to MyStore
              </h1>
              <p className="mb-6 text-lg text-blue-100 md:text-xl">
                Discover amazing products at unbeatable prices. Shop now and
                enjoy fast delivery!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/seller/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative aspect-square bg-white/10 rounded-lg overflow-hidden">
                {featuredProducts[0] && (
                  <Image
                    src={featuredProducts[0].image}
                    alt={featuredProducts[0].title}
                    fill
                    className="rounded-lg object-contain p-4"
                    priority
                    unoptimized
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[
            { name: 'Electronics', icon: '📱', href: '/products?category=electronics' },
            { name: 'Fashion', icon: '👔', href: '/products?category=men\'s clothing' },
            { name: 'Home', icon: '🏠', href: '/products?category=women\'s clothing' },
            { name: 'Jewelry', icon: '💎', href: '/products?category=jewelery' },
            { name: 'All Products', icon: '🛍️', href: '/products' },
            { name: 'Deals', icon: '🔥', href: '/products' },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center rounded-lg border bg-white p-4 text-center transition-all hover:shadow-lg"
            >
              <span className="mb-2 text-4xl">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            href="/products"
            className="flex items-center text-blue-600 hover:underline"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group rounded-lg border bg-white p-4 transition-all hover:shadow-lg"
            >
              <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain transition-transform group-hover:scale-105 p-2"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  unoptimized
                />
              </div>
              <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
                {product.title}
              </h3>
              <div className="mb-2 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">
                  {product.rating.rate.toFixed(1)} ({product.rating.count})
                </span>
              </div>
              <p className="text-lg font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Deals Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold">Top Deals</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {topDeals.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group min-w-[200px] shrink-0 rounded-lg border bg-white p-4 transition-all hover:shadow-lg sm:min-w-[250px]"
              >
                <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform group-hover:scale-105 p-2"
                    sizes="200px"
                    unoptimized
                  />
                </div>
                <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
                  {product.title}
                </h3>
                <div className="mb-2 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">
                    {product.rating.rate.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-red-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Shopping?</h2>
          <p className="mb-6 text-lg text-blue-100">
            Explore thousands of products and find the perfect deals for you.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}