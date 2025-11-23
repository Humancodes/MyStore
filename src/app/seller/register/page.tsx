'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Store, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { addUserRole } from '@/services/roleService';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import type { Seller } from '@/types/firestore';

export default function SellerRegistrationPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    businessPhone: '',
    businessEmail: '',
    taxId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to register as a seller');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const sellerId = `seller_${user.uid}`;
      
      const sellerData: Seller = {
        id: sellerId,
        userId: user.uid,
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        businessEmail: formData.businessEmail || user.email || '',
        businessPhone: formData.businessPhone,
        businessAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        taxId: formData.taxId,
        status: 'pending',
        createdAt: serverTimestamp() as any,
        updatedAt: serverTimestamp() as any,
      };

      await setDoc(doc(db, 'sellers', sellerId), sellerData);
      
      await addUserRole(user.uid, 'seller', sellerId);

      router.push('/seller/dashboard');
    } catch (err) {
      console.error('Error registering seller:', err);
      setError(err instanceof Error ? err.message : 'Failed to register as seller');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600 mb-4">
              You must be logged in to register as a seller
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              <CardTitle>Become a Seller</CardTitle>
            </div>
            <CardDescription>
              Register your business and start selling on MyStore
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    placeholder="Your Business Name"
                  />
                </div>

                <div>
                  <Label htmlFor="businessDescription">Business Description *</Label>
                  <Textarea
                    id="businessDescription"
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    required
                    placeholder="Describe your business and what you sell"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="businessEmail">Business Email *</Label>
                  <Input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    required
                    placeholder="business@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="street">Business Address *</Label>
                  <Input
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      placeholder="e.g., India"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessPhone">Business Phone *</Label>
                  <Input
                    id="businessPhone"
                    name="businessPhone"
                    type="tel"
                    value={formData.businessPhone}
                    onChange={handleChange}
                    required
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <Label htmlFor="taxId">Tax ID / GST Number *</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    required
                    placeholder="Your tax identification number"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-900 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Registering...' : 'Register as Seller'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

