import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, FileText, Calendar, Download } from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Press | MyStore',
  description: 'Press releases, media kit, and contact information for journalists',
};

const pressReleases = [
  {
    id: 1,
    title: 'MyStore Launches New Seller Platform',
    date: '2024-01-20',
    excerpt:
      "We're excited to announce the launch of our enhanced seller platform with new features and tools.",
  },
  {
    id: 2,
    title: 'MyStore Reaches 1 Million Customers Milestone',
    date: '2024-01-10',
    excerpt:
      "We're proud to announce that MyStore has reached 1 million registered customers.",
  },
  {
    id: 3,
    title: 'Partnership with Leading Payment Providers',
    date: '2023-12-15',
    excerpt:
      'MyStore partners with major payment providers to offer more secure and convenient payment options.',
  },
  {
    id: 4,
    title: 'New Sustainability Initiative Launched',
    date: '2023-12-01',
    excerpt:
      'MyStore announces new sustainability initiatives to reduce environmental impact.',
  },
];

const mediaKit = {
  logo: 'MyStore Logo Package',
  images: 'Product Images & Screenshots',
  factSheet: 'Company Fact Sheet',
  brandGuidelines: 'Brand Guidelines',
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Press Center</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Latest news, press releases, and media resources for journalists and media professionals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Press Releases</h2>
                <p className="text-gray-600">Latest announcements and news from MyStore</p>
              </div>
            </div>

            <div className="space-y-4">
              {pressReleases.map((release) => (
                <Card key={release.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            {new Date(release.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {release.title}
                        </h3>
                        <p className="text-gray-600">{release.excerpt}</p>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/press/releases/${release.id}`}>Read More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Media Kit
                </CardTitle>
                <CardDescription>
                  Download logos, images, and brand assets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(mediaKit).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-700">{value}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Media Contact
                </CardTitle>
                <CardDescription>
                  Get in touch with our press team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Press Inquiries</h3>
                  <a
                    href={`mailto:${COMPANY_INFO.contact.pressEmail}`}
                    className="text-primary hover:underline"
                  >
                    {COMPANY_INFO.contact.pressEmail}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">General Media</h3>
                  <a
                    href={`mailto:${COMPANY_INFO.contact.mediaEmail}`}
                    className="text-primary hover:underline"
                  >
                    {COMPANY_INFO.contact.mediaEmail}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a href={`tel:${COMPANY_INFO.contact.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
                    {COMPANY_INFO.contact.phone}
                  </a>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link href="/contact">Contact Press Team</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Key facts about MyStore</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Founded</h3>
                  <p className="text-gray-600">{COMPANY_INFO.founded}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Headquarters</h3>
                  <p className="text-gray-600">{COMPANY_INFO.address.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Founder & CEO</h3>
                  <p className="text-gray-600">
                    {COMPANY_INFO.founder.name}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Industry</h3>
                  <p className="text-gray-600">E-Commerce, Online Marketplace</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
                  <a href="/" className="text-primary hover:underline">
                    {COMPANY_INFO.website}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

