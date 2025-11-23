'use client';

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Seller } from '@/types/firestore';

export default function SellerProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState('');
  const [sellerData, setSellerData] = useState<Seller | null>(null);
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    businessEmail: '',
    businessPhone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    taxId: '',
  });

  useEffect(() => {
    const fetchSellerData = async () => {
      if (!user?.uid) return;

      try {
        const sellerId = `seller_${user.uid}`;
        const sellerDoc = await getDoc(doc(db, 'sellers', sellerId));
        
        if (sellerDoc.exists()) {
          const data = sellerDoc.data() as Seller;
          setSellerData(data);
          setFormData({
            businessName: data.businessName,
            businessDescription: data.businessDescription || '',
            businessEmail: data.businessEmail || '',
            businessPhone: data.businessPhone || '',
            street: data.businessAddress?.street || '',
            city: data.businessAddress?.city || '',
            state: data.businessAddress?.state || '',
            zipCode: data.businessAddress?.zipCode || '',
            country: data.businessAddress?.country || '',
            taxId: data.taxId || '',
          });
        }
      } catch (error) {
        console.error('Error fetching seller data:', error);
        setMessage('Failed to load profile');
      } finally {
        setFetching(false);
      }
    };

    fetchSellerData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.uid) return;

    setLoading(true);
    setMessage('');

    try {
      const sellerId = `seller_${user.uid}`;
      await updateDoc(doc(db, 'sellers', sellerId), {
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        businessEmail: formData.businessEmail,
        businessPhone: formData.businessPhone,
        businessAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        taxId: formData.taxId,
        updatedAt: serverTimestamp(),
      });

      setMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!sellerData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            No seller profile found. Please register as a seller first.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Seller Profile</h2>
        <p className="text-gray-600 mt-1">Manage your business information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Update your business details and contact information
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
                />
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.includes('Failed')
                    ? 'bg-red-50 text-red-900'
                    : 'bg-green-50 text-green-900'
                }`}
              >
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-600">Account Status</p>
              <p className="text-lg font-semibold capitalize">{sellerData.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold">{sellerData.businessEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-lg font-semibold">{sellerData.businessPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Seller ID</p>
              <p className="text-sm font-mono">{sellerData.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

