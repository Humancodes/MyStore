import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'MyStore Stories | MyStore',
  description: 'Read inspiring stories from our community',
};

const stories = [
  {
    id: 1,
    title: 'How MyStore Helped a Small Business Go Digital',
    excerpt:
      'Discover how a local artisan transformed their business by joining MyStore and reaching customers nationwide.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Success Stories',
    image: '/api/placeholder/600/400',
  },
  {
    id: 2,
    title: 'The Future of E-Commerce: Trends to Watch',
    excerpt:
      'Explore the latest trends shaping the future of online shopping and how MyStore is leading the way.',
    author: 'Michael Chen',
    date: '2024-01-10',
    category: 'Industry Insights',
    image: '/api/placeholder/600/400',
  },
  {
    id: 3,
    title: 'Building Trust in Online Shopping',
    excerpt:
      'Learn about the security measures and customer-first approach that makes MyStore a trusted platform.',
    author: 'Emily Rodriguez',
    date: '2024-01-05',
    category: 'Company News',
    image: '/api/placeholder/600/400',
  },
  {
    id: 4,
    title: 'Customer Spotlight: Meet Our Top Sellers',
    excerpt:
      'Get to know the amazing sellers who make MyStore special and learn their secrets to success.',
    author: 'David Kim',
    date: '2023-12-28',
    category: 'Seller Stories',
    image: '/api/placeholder/600/400',
  },
  {
    id: 5,
    title: 'Sustainability at MyStore: Our Green Initiative',
    excerpt:
      "Discover how we're working towards a more sustainable future through eco-friendly packaging and practices.",
    author: 'Lisa Wang',
    date: '2023-12-20',
    category: 'Sustainability',
    image: '/api/placeholder/600/400',
  },
  {
    id: 6,
    title: 'The Power of Community: Customer Reviews That Matter',
    excerpt:
      'See how customer feedback helps us improve and how your reviews make a difference.',
    author: 'James Taylor',
    date: '2023-12-15',
    category: 'Community',
    image: '/api/placeholder/600/400',
  },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">MyStore Stories</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Inspiring stories from our community, insights from our team, and updates
            from the world of e-commerce.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary/30">
                    {story.title.charAt(0)}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                      {story.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{story.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">
                    {story.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{story.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(story.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link
                    href={`/stories/${story.id}`}
                    className="inline-flex items-center text-primary hover:underline text-sm font-medium"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Have a Story to Share?
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  We love hearing from our community. Share your MyStore experience with us.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

