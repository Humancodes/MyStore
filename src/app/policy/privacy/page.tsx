import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Shield, Database, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | MyStore',
  description: 'Learn how we collect, use, and protect your personal information',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we protect your personal information.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Policy
              </CardTitle>
              <CardDescription>
                Last updated: January 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                <p className="text-gray-600 mb-3">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Name, email address, phone number, and shipping address</li>
                  <li>Payment information (processed securely through payment gateways)</li>
                  <li>Account credentials and preferences</li>
                  <li>Order history and transaction details</li>
                  <li>Communication preferences and feedback</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Send you order confirmations and updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our services and user experience</li>
                  <li>Send you promotional communications (with your consent)</li>
                  <li>Detect and prevent fraud and abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
                <p className="text-gray-600 mb-3">
                  We do not sell your personal information. We may share your information only in 
                  the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>With service providers who assist us in operating our platform</li>
                  <li>With payment processors to complete transactions</li>
                  <li>With shipping partners to deliver your orders</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or 
                  destruction. This includes encryption, secure servers, and regular security audits.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-3">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze how you use our platform</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve our services and user experience</li>
                </ul>
                <p className="text-gray-600 mt-3">
                  You can control cookies through your browser settings, but this may affect 
                  your ability to use certain features.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
                <p className="text-gray-600 mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Withdraw consent at any time</li>
                  <li>File a complaint with relevant data protection authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
                <p className="text-gray-600">
                  We retain your personal information for as long as necessary to fulfill the 
                  purposes outlined in this policy, unless a longer retention period is required 
                  or permitted by law. When we no longer need your information, we will securely 
                  delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Children's Privacy</h2>
                <p className="text-gray-600">
                  Our platform is not intended for children under the age of 18. We do not 
                  knowingly collect personal information from children. If you believe we have 
                  collected information from a child, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this privacy policy from time to time. We will notify you of 
                  any changes by posting the new policy on this page and updating the "Last updated" 
                  date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this privacy policy or wish to exercise your 
                  rights, please contact us through our contact page.
                </p>
              </section>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Your Privacy Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We are committed to protecting your privacy and being transparent about how we 
                collect and use your information. If you have any concerns or questions, we're here to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Privacy Team
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

