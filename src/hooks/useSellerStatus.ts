'use client';

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { FirestoreService } from '@/services/firestoreService';
import type { Seller } from '@/types/firestore';

export function useSellerStatus() {
  const user = useAppSelector(state => state.auth.user);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      fetchSellerStatus();
    } else {
      setLoading(false);
    }
  }, [user?.uid]);

  const fetchSellerStatus = async () => {
    if (!user?.uid) return;

    try {
      const sellerData = await FirestoreService.getSellerByUserId(user.uid);
      setSeller(sellerData);
    } catch (error) {
      console.error('Error fetching seller status:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    seller,
    loading,
    isApproved: seller?.status === 'approved',
    isPending: seller?.status === 'pending',
    isRejected: seller?.status === 'rejected',
    isSuspended: seller?.status === 'suspended',
  };
}
