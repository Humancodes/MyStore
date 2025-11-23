import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Careers | MyStore',
  description: 'Join the MyStore team and help shape the future of e-commerce',
};

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Lucknow, India',
    type: 'Full-time',
    description: 'Build amazing user experiences with React, Next.js, and TypeScript.',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'Lucknow, India',
    type: 'Full-time',
    description: 'Drive product strategy and work with cross-functional teams.',
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create beautiful and intuitive user experiences.',
  },
  {
    id: 4,
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'Lucknow, India',
    type: 'Full-time',
    description: 'Build scalable backend systems with Node.js and Firebase.',
  },
  {
    id: 5,
    title: 'Customer Success Manager',
    department: 'Operations',
    location: 'Lucknow, India',
    type: 'Full-time',
    description: 'Help customers succeed and ensure their satisfaction.',
  },
  {
    id: 6,
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Drive growth through innovative marketing campaigns.',
  },
];

const benefits = [
  {
    title: 'Competitive Salary',
    description: 'We offer competitive compensation packages',
  },
  {
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family',
  },
  {
    title: 'Flexible Work',
    description: 'Remote work options and flexible hours',
  },
  {
    title: 'Learning & Growth',
    description: 'Continuous learning opportunities and career development',
  },
  {
    title: 'Team Culture',
    description: 'Collaborative, inclusive, and supportive work environment',
  },
  {
    title: 'Time Off',
    description: 'Generous paid time off and holidays',
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Help us build the future of e-commerce. We're looking for talented,
            passionate people to join our growing team.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work at MyStore?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're building something special, and we need great people to help us get there.
                Join us in creating the best online shopping experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Open Positions</h2>
                <p className="text-gray-600">Explore our current job openings</p>
              </div>
            </div>

            <div className="space-y-4">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{job.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {job.type}
                              </div>
                              <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                                {job.department}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button asChild className="md:ml-4">
                        <Link href={`/careers/${job.id}`}>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg p-8 border border-gray-200">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Don't See a Role That Fits?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We're always looking for talented people. Send us your resume and we'll
                keep you in mind for future opportunities.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Send Us Your Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

