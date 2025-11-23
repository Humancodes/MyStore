'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { FirestoreService } from '@/services/firestoreService';
import { Timestamp } from 'firebase/firestore';
import {
  addToWishlist as addToWishlistAction,
  removeFromWishlist as removeFromWishlistAction,
  clearWishlist as clearWishlistAction,
} from '@/store/slices/wishlistSlice';
import type { Product } from '@/types/product';

export function useWishlistSync() {
  const user = useAppSelector(state => state.auth.user);
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!user?.uid || hasLoaded) return;

    async function loadWishlistFromFirestore() {
      if (!user?.uid) return;

      setIsLoading(true);
      try {
        const wishlist = await FirestoreService.getWishlist(user.uid);
        if (wishlist && wishlist.items.length > 0) {
          const products = await Promise.all(
            wishlist.items.map(async item => {
              try {
                const product = await FirestoreService.getProduct(
                  item.productId
                );
                if (product) {
                  return {
                    id: parseInt(product.id) || 0,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    image: product.images[0] || '',
                    rating: {
                      rate: product.rating,
                      count: product.reviewCount,
                    },
                  } as Product;
                }
              } catch (error) {
                console.error(
                  `Error loading product ${item.productId}:`,
                  error
                );
              }
              return null;
            })
          );

          const validProducts = products.filter(
            (p): p is Product => p !== null
          );

          if (validProducts.length > 0) {
            validProducts.forEach(product => {
              dispatch(addToWishlistAction(product));
            });
          }
        }
        setHasLoaded(true);
      } catch (error) {
        console.error('Error loading wishlist from Firestore:', error);
        setHasLoaded(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadWishlistFromFirestore();
  }, [user?.uid, dispatch, hasLoaded]);

  useEffect(() => {
    if (!user?.uid || !hasLoaded || isLoading) return;

    async function syncWishlistToFirestore() {
      if (!user?.uid) return;

      try {
        const wishlistItemsData = wishlistItems.map(item => ({
          productId: item.id.toString(),
          addedAt: Timestamp.now(),
        }));

        await FirestoreService.updateWishlist(user.uid, wishlistItemsData);
      } catch (error) {
        console.error('Error syncing wishlist to Firestore:', error);
      }
    }

    const timeoutId = setTimeout(syncWishlistToFirestore, 500);
    return () => clearTimeout(timeoutId);
  }, [wishlistItems, user, hasLoaded, isLoading]);
}
