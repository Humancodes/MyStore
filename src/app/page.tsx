import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllProductsFromFirestore } from '@/services/productService';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import HeroCarouselClient from '@/components/HeroCarouselClient';
import WishlistButton from '@/components/wishlist/WishlistButton';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mystore.com';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Discover amazing products at unbeatable prices. Shop now and enjoy fast delivery!',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'MyStore - Your One-Stop Shop',
    description: 'Discover amazing products at unbeatable prices. Shop now and enjoy fast delivery!',
    url: baseUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyStore - Your One-Stop Shop',
    description: 'Discover amazing products at unbeatable prices. Shop now and enjoy fast delivery!',
  },
};

export default async function HomePage() {
  const allProducts = await fetchAllProductsFromFirestore();
  const featuredProducts = allProducts.slice(0, 8);
  const topDeals = allProducts.slice(8, 24);
  const heroProducts = allProducts.slice(0, 10);
  const firstHeroImage = heroProducts[0]?.image;

  return (
    <>
      {firstHeroImage && (
        <link
          rel="preload"
          as="image"
          href={firstHeroImage}
          fetchPriority="high"
        />
      )}
      <main className="min-h-screen bg-muted">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#FF6600] via-[#FF7A00] to-[#FF6600]">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="grid items-center gap-4 md:grid-cols-2 md:gap-6">
            <div className="text-white flex flex-col justify-center">
              <h1 className="mb-3 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl xl:text-6xl">
                Welcome to MyStore
              </h1>
              <p className="mb-6 text-base leading-relaxed text-white/90 md:text-lg lg:text-xl xl:text-2xl">
                Discover amazing products at unbeatable prices. Shop now and
                enjoy fast delivery!
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <Link href="/products" className="cursor-pointer">
                  <Button
                    size="lg"
                    className="!bg-white !text-primary hover:!bg-gray-100 active:!bg-gray-200 font-semibold cursor-pointer text-base md:text-lg transition-colors duration-200"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </Link>
                <Link href="/seller/register" className="cursor-pointer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="!border-2 !border-white !bg-transparent !text-white hover:!bg-white/20 hover:!text-white active:!bg-white/30 font-semibold cursor-pointer text-base md:text-lg transition-colors duration-200"
                  >
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block w-full">
              <HeroCarouselClient products={heroProducts} />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[
            { name: 'All Products', icon: '🛍️', href: '/products' },
            { name: 'Clothes', icon: '👔', href: '/products?categorySlug=clothes' },
            { name: 'Electronics', icon: '📱', href: '/products?categorySlug=electronics' },
            { name: 'Furniture', icon: '🏠', href: '/products?categorySlug=furniture' },
            { name: 'Shoes', icon: '👟', href: '/products?categorySlug=shoes' },
            { name: 'Others', icon: '💎', href: '/products?categorySlug=others' },
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
          {featuredProducts.map((product, index) => (
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
                  quality={85}
                  priority={index < 4}
                  loading={index < 4 ? undefined : 'lazy'}
                  fetchPriority={index < 2 ? 'high' : 'auto'}
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <WishlistButton
                    product={product}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200"
                  />
                </div>
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

      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Top Deals</h2>
          </div>
          <div className="flex items-stretch gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {topDeals.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group flex max-w-[200px] shrink-0 flex-col rounded-lg border bg-white p-4 transition-all hover:shadow-lg sm:min-w-[250px] cursor-pointer h-full"
              >
                <div className="relative mb-3 aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform group-hover:scale-105 p-2"
                    sizes="(max-width: 640px) 200px, 250px"
                    quality={85}
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <WishlistButton
                      product={product}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-900">
                    {product.title}
                  </h3>
                  <div className="mb-2 flex items-center gap-1 shrink-0">
                    <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">
                      {product.rating.rate.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-auto flex items-center gap-2 shrink-0">
                    <p className="text-lg font-bold text-red-600">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
    </>
  );
}