import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Sitemap | MyStore',
  description: 'Complete site map of all pages and sections',
};

const siteStructure = [
  {
    category: 'Shopping',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/products' },
      { name: 'Cart', href: '/cart' },
      { name: 'Wishlist', href: '/wishlist' },
    ],
  },
  {
    category: 'Account',
    links: [
      { name: 'Login', href: '/login' },
      { name: 'Sign Up', href: '/signup' },
      { name: 'My Account', href: '/buyer/dashboard' },
      { name: 'My Orders', href: '/buyer/dashboard/orders' },
    ],
  },
  {
    category: 'About',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'MyStore Stories', href: '/stories' },
      { name: 'Press', href: '/press' },
    ],
  },
  {
    category: 'Help',
    links: [
      { name: 'Payments', href: '/help/payments' },
      { name: 'Shipping', href: '/help/shipping' },
      { name: 'Cancellation & Returns', href: '/help/returns' },
      { name: 'FAQ', href: '/help/faq' },
    ],
  },
  {
    category: 'Policies',
    links: [
      { name: 'Cancellation & Returns', href: '/policy/returns' },
      { name: 'Terms of Use', href: '/policy/terms' },
      { name: 'Security', href: '/policy/security' },
      { name: 'Privacy', href: '/policy/privacy' },
    ],
  },
  {
    category: 'Seller',
    links: [
      { name: 'Become a Seller', href: '/seller/register' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Sitemap</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Complete navigation guide to all pages on MyStore
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteStructure.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                        >
                          <span>{link.name}</span>
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>
                Most frequently accessed pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/products"
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">Shop Now</h3>
                  <p className="text-sm text-gray-600">Browse all products</p>
                </Link>
                <Link
                  href="/help/faq"
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">Help Center</h3>
                  <p className="text-sm text-gray-600">Get answers to questions</p>
                </Link>
                <Link
                  href="/contact"
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">Contact Us</h3>
                  <p className="text-sm text-gray-600">Reach out to support</p>
                </Link>
                <Link
                  href="/seller/register"
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">Sell on MyStore</h3>
                  <p className="text-sm text-gray-600">Start selling today</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

