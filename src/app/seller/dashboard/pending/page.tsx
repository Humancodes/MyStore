'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, XCircle, Ban } from 'lucide-react';
import { useSellerStatus } from '@/hooks/useSellerStatus';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SellerPendingPage() {
  const { seller, loading } = useSellerStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getStatusInfo = () => {
    switch (seller?.status) {
      case 'pending':
        return {
          icon: Clock,
          title: 'Application Under Review',
          description: 'Your seller application is being reviewed by our team. This usually takes 1-2 business days.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        };
      case 'rejected':
        return {
          icon: XCircle,
          title: 'Application Rejected',
          description: 'Unfortunately, your seller application has been rejected. Please contact support for more information.',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
      case 'suspended':
        return {
          icon: Ban,
          title: 'Account Suspended',
          description: 'Your seller account has been suspended. Please contact support to resolve this issue.',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        };
      default:
        return {
          icon: AlertCircle,
          title: 'Account Status Unknown',
          description: 'Unable to determine your account status. Please contact support.',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className={`border-2 ${statusInfo.borderColor}`}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${statusInfo.bgColor}`}>
                <StatusIcon className={`h-8 w-8 ${statusInfo.color}`} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">{statusInfo.title}</CardTitle>
                {seller && (
                  <Badge className={`mt-2 ${statusInfo.bgColor} ${statusInfo.color}`}>
                    {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 text-lg">{statusInfo.description}</p>

            {seller && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-gray-900">Your Application Details</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Business Name:</strong> {seller.businessName}</p>
                  <p><strong>Email:</strong> {seller.businessEmail}</p>
                  <p><strong>Phone:</strong> {seller.businessPhone}</p>
                  <p><strong>Submitted:</strong> {new Date(seller.createdAt.seconds * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            {seller?.status === 'pending' && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Our team will review your business information</li>
                  <li>We may contact you for additional verification</li>
                  <li>You'll receive an email once your application is approved</li>
                  <li>After approval, you can start listing products</li>
                </ul>
              </div>
            )}

            {(seller?.status === 'rejected' || seller?.status === 'suspended') && (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Need Help?</h4>
                <p className="text-sm text-orange-800 mb-3">
                  If you have questions about your account status, please contact our support team.
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="border-orange-300">
                    Contact Support
                  </Button>
                </Link>
              </div>
            )}

            <div className="pt-4 border-t">
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

