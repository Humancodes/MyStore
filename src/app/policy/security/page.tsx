import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Key, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Security Policy | MyStore',
  description: 'Learn about our security measures and how we protect your data',
};

const securityFeatures = [
  {
    title: 'SSL Encryption',
    description: 'All data transmitted between your browser and our servers is encrypted using 256-bit SSL encryption.',
    icon: Lock,
  },
  {
    title: 'Secure Payment Processing',
    description: 'We use PCI DSS compliant payment gateways. Your card details are never stored on our servers.',
    icon: Shield,
  },
  {
    title: 'Data Protection',
    description: 'We implement industry-standard security measures to protect your personal information.',
    icon: Eye,
  },
  {
    title: 'Secure Authentication',
    description: 'Multi-factor authentication and secure password policies to protect your account.',
    icon: Key,
  },
];

const tips = [
  'Never share your account password with anyone',
  'Use a strong, unique password for your account',
  'Log out when using shared or public computers',
  'Keep your contact information up to date',
  'Report any suspicious activity immediately',
  'Be cautious of phishing emails or messages',
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Security Policy</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your security and privacy are our top priorities
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Shield className="h-5 w-5" />
                  Our Commitment to Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800">
                  At MyStore, we take security seriously. We implement multiple layers of security 
                  measures to protect your personal information, payment details, and account data. 
                  Your trust is important to us, and we continuously work to maintain the highest 
                  security standards.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Security Measures</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Payment Security</CardTitle>
                <CardDescription>
                  How we protect your payment information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">PCI DSS Compliance</h3>
                    <p className="text-gray-600 text-sm">
                      Our payment processing is PCI DSS Level 1 compliant, the highest level of 
                      certification in the payment card industry.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">No Card Storage</h3>
                    <p className="text-gray-600 text-sm">
                      We never store your complete card details on our servers. All payment 
                      information is handled securely by our certified payment partners.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Encrypted Transactions</h3>
                    <p className="text-gray-600 text-sm">
                      All payment transactions are encrypted end-to-end using industry-standard 
                      encryption protocols.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
                <CardDescription>
                  How we protect your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We implement comprehensive data protection measures including:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Regular security audits and vulnerability assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Access controls and authentication mechanisms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Secure data storage with encryption at rest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Regular backups and disaster recovery procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Employee training on data protection and security</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Security Best Practices for Users
                </CardTitle>
                <CardDescription>
                  How you can help keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <span className="text-primary text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Reporting Security Issues</CardTitle>
                <CardDescription>
                  Found a security vulnerability? Let us know
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you discover a security vulnerability, please report it to us immediately. 
                  We take all security reports seriously and will investigate promptly.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Report Security Issue
                </a>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

