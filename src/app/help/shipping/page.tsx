import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, Clock, MapPin, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping Information | MyStore Help Center',
  description: 'Learn about shipping options, delivery times, and tracking your orders',
};

const shippingOptions = [
  {
    name: 'Standard Delivery',
    time: '5-7 business days',
    cost: 'Free on orders above ₹500',
    icon: Truck,
  },
  {
    name: 'Express Delivery',
    time: '2-3 business days',
    cost: '₹99',
    icon: Package,
  },
  {
    name: 'Same Day Delivery',
    time: 'Same day (select cities)',
    cost: '₹199',
    icon: Clock,
  },
];

const faqs = [
  {
    question: 'How long does shipping take?',
    answer:
      'Standard delivery takes 5-7 business days. Express delivery (2-3 days) and same-day delivery options are available for select locations.',
  },
  {
    question: 'What are the shipping charges?',
    answer:
      'Standard shipping is free on orders above ₹500. Express delivery costs ₹99, and same-day delivery costs ₹199 (available in select cities).',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order ships, you will receive a tracking number via email and SMS. You can track your order in the "My Orders" section of your account.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Currently, we only ship within India. International shipping is not available at this time.',
  },
  {
    question: 'What if my order is delayed?',
    answer:
      'If your order is delayed beyond the estimated delivery date, please contact our support team. We will investigate and keep you updated.',
  },
  {
    question: 'Can I change my delivery address?',
    answer:
      'You can change your delivery address before your order ships. Once shipped, address changes may not be possible. Contact support for assistance.',
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Shipping Information</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Everything you need to know about shipping, delivery, and tracking your orders
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Shipping Options</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {shippingOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{option.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{option.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                          <Package className="h-4 w-4" />
                          <span>{option.cost}</span>
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
                  <MapPin className="h-5 w-5" />
                  Delivery Areas
                </CardTitle>
                <CardDescription>
                  We deliver to all major cities and towns across India
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We provide shipping services to all major cities and towns across India. 
                  Delivery times may vary based on your location. Remote areas may take 
                  additional time for delivery.
                </p>
                <p className="text-gray-600">
                  For same-day delivery, please check if your city is eligible during checkout.
                  Currently available in major metropolitan areas.
                </p>
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
                Need help with your shipment?
              </h2>
              <p className="text-gray-600 mb-6">
                Contact our support team for assistance with shipping and delivery.
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

