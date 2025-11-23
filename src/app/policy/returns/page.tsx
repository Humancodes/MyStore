import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Clock, CheckCircle, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Cancellation & Returns Policy | MyStore',
  description: 'Learn about our cancellation and returns policy',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Cancellation & Returns Policy</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Our comprehensive policy on order cancellations and product returns
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Return Policy Overview
                </CardTitle>
                <CardDescription>
                  Last updated: January 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  At MyStore, we want you to be completely satisfied with your purchase. 
                  If you are not happy with your order, you can return most items within 
                  7 days of delivery for a full refund or exchange.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 mb-1">Easy Returns</p>
                      <p className="text-green-800 text-sm">
                        Free pickup available. Refund processed within 5-7 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Return Conditions</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Items Eligible for Return
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Items must be unused and in original condition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Original packaging and tags must be intact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>All accessories and freebies must be included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Return request must be initiated within 7 days</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Non-Returnable Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Perishable goods (food, flowers, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Personalized or customized products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Intimate or sanitary goods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span>Items damaged by misuse</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cancellation Policy</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Before Shipment
                  </h3>
                  <p className="text-gray-600">
                    You can cancel your order anytime before it ships. Once cancelled, 
                    you will receive a full refund within 5-7 business days.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    After Shipment
                  </h3>
                  <p className="text-gray-600">
                    If your order has already shipped, you cannot cancel it. However, 
                    you can return it after delivery following our return policy.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Partial Cancellation
                  </h3>
                  <p className="text-gray-600">
                    Partial cancellation of orders is allowed. You can cancel specific 
                    items from your order before shipment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Refund Process</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Return Initiated</h3>
                      <p className="text-gray-600 text-sm">
                        Submit return request from "My Orders" section
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Pickup Scheduled</h3>
                      <p className="text-gray-600 text-sm">
                        We schedule a free pickup at your convenience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Quality Check</h3>
                      <p className="text-gray-600 text-sm">
                        Item is verified for condition and completeness
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Refund Processed</h3>
                      <p className="text-gray-600 text-sm">
                        Refund credited to original payment method within 5-7 business days
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  For questions about returns or cancellations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have any questions about our cancellation and returns policy, 
                  please contact our customer support team.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

