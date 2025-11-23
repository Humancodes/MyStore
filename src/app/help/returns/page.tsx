import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Package, Clock, HelpCircle, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Cancellation & Returns | MyStore Help Center',
  description: 'Learn about our return policy, cancellation process, and refund information',
};

const returnSteps = [
  {
    step: 1,
    title: 'Initiate Return',
    description: 'Go to "My Orders" and select the item you want to return',
    icon: RotateCcw,
  },
  {
    step: 2,
    title: 'Select Reason',
    description: 'Choose a reason for return and submit your request',
    icon: Package,
  },
  {
    step: 3,
    title: 'Package Item',
    description: 'Pack the item securely in original packaging if possible',
    icon: Package,
  },
  {
    step: 4,
    title: 'Pickup Scheduled',
    description: 'We will schedule a pickup at your convenience',
    icon: Clock,
  },
  {
    step: 5,
    title: 'Refund Processed',
    description: 'Once verified, refund will be processed within 5-7 business days',
    icon: CheckCircle,
  },
];

const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      'You can return most items within 7 days of delivery. Items must be unused, in original packaging, and with all tags attached. Some items like perishables, personalized products, and intimate items are not returnable.',
  },
  {
    question: 'How do I cancel my order?',
    answer:
      'You can cancel your order from "My Orders" section before it ships. Once shipped, you can initiate a return after receiving the item.',
  },
  {
    question: 'How long does it take to process a refund?',
    answer:
      'Refunds are processed within 5-7 business days after we receive and verify the returned item. The amount will be credited to your original payment method.',
  },
  {
    question: 'What if I receive a damaged or wrong item?',
    answer:
      'If you receive a damaged or incorrect item, please contact our support team immediately. We will arrange a free replacement or full refund.',
  },
  {
    question: 'Can I return items bought on sale?',
    answer:
      'Yes, sale items can be returned following the same return policy, as long as they meet the return conditions (unused, original packaging, etc.).',
  },
  {
    question: 'Who pays for return shipping?',
    answer:
      'We provide free return pickup for most returns. However, if the return is due to a change of mind and the item is not defective, return shipping charges may apply.',
  },
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Cancellation & Returns</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Everything you need to know about returning items and getting refunds
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <CheckCircle className="h-5 w-5" />
                  Easy Returns Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800">
                  Return most items within 7 days of delivery. Free pickup available. 
                  Refund processed within 5-7 business days after verification.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Return an Item</h2>
            <div className="space-y-4">
              {returnSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.step}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-lg text-gray-900">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-gray-600">{step.description}</p>
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
                <CardTitle>Non-Returnable Items</CardTitle>
                <CardDescription>
                  Some items cannot be returned for hygiene or safety reasons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Perishable goods (food items, flowers, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Personalized or customized products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Intimate or sanitary goods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Items damaged by misuse or without original packaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Digital products or software</span>
                  </li>
                </ul>
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
                Need help with a return?
              </h2>
              <p className="text-gray-600 mb-6">
                Our support team is ready to assist you with returns and refunds.
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

