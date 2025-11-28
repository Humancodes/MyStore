import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our complete collection of products. Find the best deals and shop with confidence.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mystore.com'}/products`,
  },
  openGraph: {
    title: 'All Products | MyStore',
    description: 'Browse our complete collection of products. Find the best deals and shop with confidence.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mystore.com'}/products`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'All Products | MyStore',
    description: 'Browse our complete collection of products. Find the best deals and shop with confidence.',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

