'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Seller } from '@/types/firestore';
import { Check, X, Clock, Ban } from 'lucide-react';

type SellerStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const sellersRef = collection(db, 'sellers');
      const snapshot = await getDocs(sellersRef);
      const sellersData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Seller[];
      setSellers(sellersData);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSellerStatus = async (sellerId: string, status: SellerStatus) => {
    setUpdating(sellerId);
    try {
      await updateDoc(doc(db, 'sellers', sellerId), {
        status,
        ...(status === 'approved' && { approvedAt: serverTimestamp() }),
        updatedAt: serverTimestamp(),
      });
      
      setSellers(prevSellers =>
        prevSellers.map(seller =>
          seller.id === sellerId ? { ...seller, status } : seller
        )
      );
    } catch (error) {
      console.error('Error updating seller status:', error);
      alert('Failed to update seller status');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status: SellerStatus) => {
    const variants = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', icon: Check },
      rejected: { color: 'bg-red-100 text-red-800', icon: X },
      suspended: { color: 'bg-gray-100 text-gray-800', icon: Ban },
    };

    const { color, icon: Icon } = variants[status];

    return (
      <Badge className={`${color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const pendingSellers = sellers.filter(s => s.status === 'pending');
  const approvedSellers = sellers.filter(s => s.status === 'approved');
  const otherSellers = sellers.filter(s => s.status !== 'pending' && s.status !== 'approved');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Seller Management</h2>
        <p className="text-gray-600 mt-1">
          Review and manage seller applications
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSellers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedSellers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellers.length}</div>
          </CardContent>
        </Card>
      </div>

      {pendingSellers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Review and approve seller applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingSellers.map((seller) => (
                <div
                  key={seller.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{seller.businessName}</h3>
                    <p className="text-sm text-gray-600">{seller.businessEmail}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {seller.businessAddress.city}, {seller.businessAddress.state}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(seller.status)}
                    <Button
                      size="sm"
                      onClick={() => updateSellerStatus(seller.id, 'approved')}
                      disabled={updating === seller.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateSellerStatus(seller.id, 'rejected')}
                      disabled={updating === seller.id}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Sellers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sellers.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No sellers yet</p>
            ) : (
              sellers.map((seller) => (
                <div
                  key={seller.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{seller.businessName}</h3>
                    <p className="text-sm text-gray-600">{seller.businessEmail}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {seller.businessPhone} • {seller.businessAddress.city}, {seller.businessAddress.state}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(seller.status)}
                    {seller.status === 'approved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateSellerStatus(seller.id, 'suspended')}
                        disabled={updating === seller.id}
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    )}
                    {seller.status === 'suspended' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateSellerStatus(seller.id, 'approved')}
                        disabled={updating === seller.id}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Reactivate
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

