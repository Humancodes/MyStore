import Link from 'next/link';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-7">
          {/* ABOUT */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">
              About
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-white">
                  MyStore Stories
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* GROUP COMPANIES */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">
              Group Companies
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  MyStore Fashion
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  MyStore Travel
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  MyStore Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">
              Help
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help/payments" className="hover:text-white">
                  Payments
                </Link>
              </li>
              <li>
                <Link href="/help/shipping" className="hover:text-white">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="hover:text-white">
                  Cancellation & Returns
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* CONSUMER POLICY */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">
              Consumer Policy
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/policy/returns" className="hover:text-white">
                  Cancellation & Returns
                </Link>
              </li>
              <li>
                <Link href="/policy/terms" className="hover:text-white">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link href="/policy/security" className="hover:text-white">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/policy/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* MAIL US */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">
              Mail Us
            </h3>
            <address className="not-italic text-sm leading-relaxed">
              MyStore Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia & Clove
              <br />
              Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103,
              <br />
              Karnataka, India
            </address>
          </div>

          {/* REGISTERED OFFICE */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">
              Registered Office Address
            </h3>
            <address className="not-italic text-sm leading-relaxed">
              MyStore Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia & Clove
              <br />
              Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103,
              <br />
              Karnataka, India
              <br />
              <br />
              CIN: U51109KA2012PTC066107
              <br />
              Telephone: 044-45614700
            </address>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-white">
              Social
            </h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Left Side - Utility Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/seller/register" className="flex items-center gap-2 hover:text-white">
                <span>🛍️</span>
                <span>Become a Seller</span>
              </Link>
              <Link href="/advertise" className="flex items-center gap-2 hover:text-white">
                <span>⭐</span>
                <span>Advertise</span>
              </Link>
              <Link href="/gift-cards" className="flex items-center gap-2 hover:text-white">
                <span>🎁</span>
                <span>Gift Cards</span>
              </Link>
              <Link href="/help" className="flex items-center gap-2 hover:text-white">
                <span>❓</span>
                <span>Help Center</span>
              </Link>
            </div>

            {/* Center - Copyright */}
            <div className="text-sm text-gray-400">
              © 2024-2025 MyStore.com
            </div>

            {/* Right Side - Payment Methods */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>We accept:</span>
              <div className="flex gap-1">
                <span className="rounded bg-white px-2 py-1 font-semibold text-blue-600">
                  VISA
                </span>
                <span className="rounded bg-white px-2 py-1 font-semibold text-red-600">
                  MC
                </span>
                <span className="rounded bg-white px-2 py-1 font-semibold text-blue-500">
                  COD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
