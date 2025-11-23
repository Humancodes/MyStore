import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata = {
  title: 'FAQ | MyStore Help Center',
  description: 'Frequently asked questions about shopping, orders, payments, and more',
};

const faqCategories = [
  {
    category: 'Account & Orders',
    faqs: [
      {
        question: 'How do I create an account?',
        answer:
          'Click on "Sign Up" in the header, fill in your details, and verify your email. You can also sign up using your Google account.',
      },
      {
        question: 'How do I track my order?',
        answer:
          'Go to "My Orders" in your account dashboard. You will see all your orders with tracking information. You will also receive tracking updates via email and SMS.',
      },
      {
        question: 'Can I modify my order after placing it?',
        answer:
          'You can cancel your order before it ships. Once shipped, you can return the item after delivery. Contact support for assistance.',
      },
      {
        question: 'How do I view my order history?',
        answer:
          'Log in to your account and go to "My Orders" section. You will see all your past and current orders with details.',
      },
    ],
  },
  {
    category: 'Shopping',
    faqs: [
      {
        question: 'How do I search for products?',
        answer:
          'Use the search bar in the header to search by product name, brand, or category. You can also browse products by category.',
      },
      {
        question: 'Are the product images accurate?',
        answer:
          'We strive to provide accurate product images. However, actual colors may vary slightly due to screen settings. Please refer to product descriptions for details.',
      },
      {
        question: 'Can I save products for later?',
        answer:
          'Yes! Click the heart icon on any product to add it to your wishlist. You can access your wishlist from the header menu.',
      },
      {
        question: 'Do you offer discounts or coupons?',
        answer:
          'Yes, we regularly offer discounts and promotional codes. Sign up for our newsletter to receive exclusive offers and coupon codes.',
      },
    ],
  },
  {
    category: 'Payments',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery (COD) for eligible orders.',
      },
      {
        question: 'Is it safe to pay online?',
        answer:
          'Yes, all payments are processed through secure payment gateways with SSL encryption. We never store your card details.',
      },
      {
        question: 'When will I be charged?',
        answer:
          'For online payments, you are charged immediately when you place the order. For COD orders, payment is collected upon delivery.',
      },
      {
        question: 'How do I get a refund?',
        answer:
          'Refunds are automatically processed to your original payment method within 5-7 business days after we receive and verify your return.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    faqs: [
      {
        question: 'How long does shipping take?',
        answer:
          'Standard delivery takes 5-7 business days. Express (2-3 days) and same-day delivery options are available for select locations.',
      },
      {
        question: 'What are the shipping charges?',
        answer:
          'Standard shipping is free on orders above ₹500. Express delivery costs ₹99, and same-day delivery costs ₹199.',
      },
      {
        question: 'Do you ship to all cities?',
        answer:
          'We ship to all major cities and towns across India. Delivery times may vary based on your location.',
      },
      {
        question: 'Can I change my delivery address?',
        answer:
          'You can change your delivery address before your order ships. Once shipped, contact support for assistance.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    faqs: [
      {
        question: 'What is your return policy?',
        answer:
          'You can return most items within 7 days of delivery. Items must be unused, in original packaging, with all tags attached.',
      },
      {
        question: 'How do I return an item?',
        answer:
          'Go to "My Orders", select the item you want to return, choose a reason, and submit. We will schedule a free pickup.',
      },
      {
        question: 'How long does it take to process a refund?',
        answer:
          'Refunds are processed within 5-7 business days after we receive and verify the returned item.',
      },
      {
        question: 'What items cannot be returned?',
        answer:
          'Perishable goods, personalized products, intimate items, and items damaged by misuse cannot be returned.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Find answers to common questions about shopping, orders, payments, and more
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is here to help.
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

