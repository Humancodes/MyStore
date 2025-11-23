'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { FirestoreService } from '@/services/firestoreService';
import { Timestamp } from 'firebase/firestore';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
} from '@/store/slices/cartSlice';
import type { Product } from '@/types/product';

export function useCartSync() {
  const user = useAppSelector(state => state.auth.user);
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!user?.uid || hasLoaded) return;

    async function loadCartFromFirestore() {
      if (!user?.uid) return;

      setIsLoading(true);
      try {
        const cart = await FirestoreService.getCart(user.uid);
        if (cart && cart.items.length > 0) {
          const products = await Promise.all(
            cart.items.map(async item => {
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
                    quantity: item.quantity,
                  } as Product & { quantity: number };
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
            (p): p is Product & { quantity: number } => p !== null
          );

          if (validProducts.length > 0) {
            validProducts.forEach(product => {
              dispatch(
                addToCartAction({ product, quantity: product.quantity })
              );
            });
          }
        }
        setHasLoaded(true);
      } catch (error) {
        console.error('Error loading cart from Firestore:', error);
        setHasLoaded(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadCartFromFirestore();
  }, [user?.uid, dispatch, hasLoaded]);

  useEffect(() => {
    if (!user?.uid || !hasLoaded || isLoading) return;

    async function syncCartToFirestore() {
      if (!user?.uid) return;

      try {
        const cartItemsData = cartItems.map(item => ({
          productId: item.id.toString(),
          quantity: item.quantity,
          addedAt: Timestamp.now(),
        }));

        await FirestoreService.updateCart(user.uid, cartItemsData);
      } catch (error) {
        console.error('Error syncing cart to Firestore:', error);
      }
    }

    const timeoutId = setTimeout(syncCartToFirestore, 500);
    return () => clearTimeout(timeoutId);
  }, [cartItems, user, hasLoaded, isLoading]);
}
