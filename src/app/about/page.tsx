import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Heart, User } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'About Us | MyStore',
  description: 'Learn about MyStore - Your trusted online shopping destination',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About MyStore</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your trusted online shopping destination, bringing you the best products
            at unbeatable prices since 2024.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                MyStore was founded in {COMPANY_INFO.founded} by {COMPANY_INFO.founder.name} with a simple mission: to make online shopping
                accessible, convenient, and enjoyable for everyone. We started as a small
                team with a big dream - to revolutionize the e-commerce experience.
              </p>
              <p>
                Today, we've grown into a trusted marketplace connecting millions of customers
                with thousands of sellers. We offer a wide range of products across multiple
                categories, from electronics and fashion to home essentials and more.
              </p>
              <p>
                Our commitment to quality, customer satisfaction, and innovation drives
                everything we do. We believe that shopping should be simple, secure, and
                delightful.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Customer First</h3>
                      <p className="text-gray-600 text-sm">
                        Our customers are at the heart of everything we do. We listen,
                        learn, and continuously improve to serve you better.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                      <p className="text-gray-600 text-sm">
                        We strive for excellence in every aspect of our business,
                        from product quality to customer service.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Integrity</h3>
                      <p className="text-gray-600 text-sm">
                        We conduct our business with honesty, transparency, and
                        ethical practices. Trust is the foundation of our relationships.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                      <p className="text-gray-600 text-sm">
                        We embrace new technologies and ideas to enhance your
                        shopping experience and stay ahead of the curve.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  To democratize commerce and make quality products accessible to everyone,
                  everywhere. We're building a platform that empowers both buyers and sellers,
                  creating opportunities and fostering growth in the digital economy.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Leadership</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {COMPANY_INFO.founder.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {COMPANY_INFO.founder.title}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {COMPANY_INFO.founder.name} founded MyStore in {COMPANY_INFO.founded} with a vision
                      to revolutionize the e-commerce experience. Under {COMPANY_INFO.founder.name.split(' ')[0]}'s leadership,
                      MyStore has grown into a trusted marketplace connecting customers with sellers
                      across the country.
                    </p>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-900 mb-1">Education</p>
                      <p className="text-sm text-gray-600">
                        {COMPANY_INFO.founder.education.degree} from{' '}
                        <a
                          href={COMPANY_INFO.founder.education.universityUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {COMPANY_INFO.founder.education.university}
                        </a>
                        , {COMPANY_INFO.founder.education.location}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MyStore?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Wide Selection</h3>
                  <p className="text-gray-600">
                    Browse through thousands of products across multiple categories
                    from verified sellers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Best Prices</h3>
                  <p className="text-gray-600">
                    We work with sellers to bring you competitive prices and exclusive deals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Shopping</h3>
                  <p className="text-gray-600">
                    Your data and transactions are protected with industry-leading security measures.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
                  <p className="text-gray-600">
                    Quick and reliable shipping options to get your orders to you as fast as possible.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Us</h2>
            <p className="text-gray-600 mb-6">
              Whether you're a customer looking for great deals or a seller wanting to reach
              more customers, MyStore is the place for you.
            </p>
            <div className="flex gap-4">
              <a
                href="/signup"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </a>
              <a
                href="/seller/register"
                className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                Become a Seller
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

