import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Shield, Lock, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Payments | MyStore Help Center',
  description: 'Learn about payment methods, security, and payment-related FAQs',
};

const paymentMethods = [
  {
    name: 'Credit/Debit Cards',
    description: 'Visa, Mastercard, RuPay, and other major cards accepted',
    icon: CreditCard,
  },
  {
    name: 'Cash on Delivery (COD)',
    description: 'Pay when you receive your order',
    icon: CreditCard,
  },
  {
    name: 'UPI',
    description: 'Pay using UPI apps like Google Pay, PhonePe, Paytm',
    icon: CreditCard,
  },
  {
    name: 'Net Banking',
    description: 'Direct bank transfer from your account',
    icon: CreditCard,
  },
];

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept Credit/Debit Cards (Visa, Mastercard, RuPay), UPI, Net Banking, and Cash on Delivery (COD) for eligible orders.',
  },
  {
    question: 'Is it safe to pay online?',
    answer:
      'Yes, all online payments are processed through secure payment gateways with SSL encryption. We never store your card details.',
  },
  {
    question: 'When will I be charged?',
    answer:
      'For online payments, you will be charged immediately when you place the order. For COD orders, payment is collected upon delivery.',
  },
  {
    question: 'Can I get a refund if I cancel my order?',
    answer:
      'Yes, if you cancel your order before it ships, you will receive a full refund. Refunds are processed within 5-7 business days.',
  },
  {
    question: 'What if my payment fails?',
    answer:
      'If your payment fails, please check your card details, ensure sufficient balance, and try again. Contact your bank if the issue persists.',
  },
  {
    question: 'Do you support international cards?',
    answer:
      'Currently, we accept Indian payment methods only. International cards are not supported at this time.',
  },
];

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Payment Help</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Everything you need to know about payments, security, and transactions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Accepted Payment Methods</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{method.name}</h3>
                          <p className="text-gray-600 text-sm">{method.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Payment Security
                </CardTitle>
                <CardDescription>
                  Your payment information is protected with industry-standard security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">SSL Encryption</h3>
                    <p className="text-gray-600 text-sm">
                      All payment transactions are encrypted using 256-bit SSL encryption to protect your data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">PCI DSS Compliant</h3>
                    <p className="text-gray-600 text-sm">
                      Our payment processing is PCI DSS compliant, ensuring the highest security standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">No Card Storage</h3>
                    <p className="text-gray-600 text-sm">
                      We never store your card details. All payments are processed securely through our payment partners.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-6">
                Our support team is here to help with any payment-related queries.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

