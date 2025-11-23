import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use | MyStore',
  description: 'Terms and conditions for using MyStore platform',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Terms of Use</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Please read these terms carefully before using our platform
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Terms and Conditions
              </CardTitle>
              <CardDescription>
                Last updated: January 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing and using MyStore, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to these terms, please 
                  do not use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use License</h2>
                <p className="text-gray-600 mb-3">
                  Permission is granted to temporarily use MyStore for personal, non-commercial 
                  transitory viewing only. This is the grant of a license, not a transfer of title, 
                  and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on MyStore</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
                <p className="text-gray-600 mb-3">
                  To access certain features, you must create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate and complete information</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Product Information</h2>
                <p className="text-gray-600">
                  We strive to provide accurate product information, including descriptions, images, 
                  and pricing. However, we do not warrant that product descriptions or other content 
                  is accurate, complete, reliable, current, or error-free. Prices and availability are 
                  subject to change without notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Orders and Payment</h2>
                <p className="text-gray-600 mb-3">
                  When you place an order, you are making an offer to purchase products at the prices 
                  listed. We reserve the right to accept or reject any order. Payment must be received 
                  before we process and ship your order.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Prohibited Uses</h2>
                <p className="text-gray-600 mb-3">
                  You may not use our platform:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
                <p className="text-gray-600">
                  In no event shall MyStore or its suppliers be liable for any damages (including, 
                  without limitation, damages for loss of data or profit, or due to business interruption) 
                  arising out of the use or inability to use the materials on MyStore, even if MyStore 
                  or a MyStore authorized representative has been notified orally or in writing of the 
                  possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Revisions and Errata</h2>
                <p className="text-gray-600">
                  The materials appearing on MyStore could include technical, typographical, or 
                  photographic errors. MyStore does not warrant that any of the materials on its 
                  platform are accurate, complete, or current. MyStore may make changes to the 
                  materials at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Governing Law</h2>
                <p className="text-gray-600">
                  These terms and conditions are governed by and construed in accordance with the 
                  laws of India. Any disputes relating to these terms shall be subject to the 
                  exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to Terms</h2>
                <p className="text-gray-600">
                  MyStore may revise these terms of use at any time without notice. By using this 
                  platform, you are agreeing to be bound by the then current version of these terms 
                  of use.
                </p>
              </section>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Contact for Legal Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For any legal questions or concerns regarding these terms, please contact us.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Legal Team
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

