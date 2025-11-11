import Link from 'next/link';
import Image from 'next/image';
import { fetchAllProducts } from '@/services/fakeStoreApi';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';

export default async function HomePage() {
  // Fetch featured products (first 8 products)
  const allProducts = await fetchAllProducts();
  const featuredProducts = allProducts.slice(0, 8);
  const topDeals = allProducts.slice(8, 14);
  // Products for hero carousel (first 5 products)
  const heroProducts = allProducts.slice(0, 5);

  return (
    <main className="min-h-screen bg-muted">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#FF6600] via-[#FF7A00] to-[#FF6600]">
        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
            {/* Left Side - Text Content */}
            <div className="text-white flex flex-col justify-center">
              <h1 className="mb-3 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl xl:text-6xl">
                Welcome to MyStore
              </h1>
              <p className="mb-5 text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">
                Discover amazing products at unbeatable prices. Shop now and
                enjoy fast delivery!
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <Link href="/products" className="cursor-pointer">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 font-semibold cursor-pointer"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/seller/register" className="cursor-pointer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 font-semibold cursor-pointer"
                  >
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </div>
            {/* Right Side - Carousel */}
            <div className="relative hidden md:block w-full">
              <HeroCarousel products={heroProducts} />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Shop by Category</h2>
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
              className="group flex flex-col items-center rounded-lg border bg-white p-4 text-center transition-all hover:shadow-lg cursor-pointer"
            >
              <span className="mb-2 text-4xl">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <Link
            href="/products"
            className="flex items-center text-primary hover:underline cursor-pointer"
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
              className="group rounded-lg border bg-white p-4 transition-all hover:shadow-lg cursor-pointer"
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
              <p className="text-lg font-bold text-primary">
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
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Top Deals</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {topDeals.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group min-w-[200px] shrink-0 rounded-lg border bg-white p-4 transition-all hover:shadow-lg sm:min-w-[250px] cursor-pointer"
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
        <div className="rounded-lg bg-gradient-to-r from-[#FF6600] to-[#FF7A00] p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Shopping?</h2>
          <p className="mb-6 text-lg text-white/90">
            Explore thousands of products and find the perfect deals for you.
          </p>
          <Link href="/products" className="cursor-pointer">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 cursor-pointer"
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