import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  writeBatch,
  serverTimestamp,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  FirestoreUser,
  Seller,
  FirestoreProduct,
  Order,
  Review,
  UserWishlist,
  UserCart,
} from '@/types/firestore';

const COLLECTIONS = {
  USERS: 'users',
  SELLERS: 'sellers',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  REVIEWS: 'reviews',
  WISHLISTS: 'wishlists',
  CARTS: 'carts',
} as const;

export class FirestoreService {
  static async createUser(
    userData: Omit<FirestoreUser, 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    const userRef = doc(db, COLLECTIONS.USERS, userData.uid);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  static async getUser(uid: string): Promise<FirestoreUser | null> {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as FirestoreUser;
    }
    return null;
  }

  static async updateUser(
    uid: string,
    data: Partial<FirestoreUser>
  ): Promise<void> {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  static async createSeller(
    sellerData: Omit<Seller, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const sellerRef = doc(collection(db, COLLECTIONS.SELLERS));
    await setDoc(sellerRef, {
      ...sellerData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return sellerRef.id;
  }

  static async getSeller(sellerId: string): Promise<Seller | null> {
    const sellerRef = doc(db, COLLECTIONS.SELLERS, sellerId);
    const sellerSnap = await getDoc(sellerRef);
    if (sellerSnap.exists()) {
      return { id: sellerSnap.id, ...sellerSnap.data() } as Seller;
    }
    return null;
  }

  static async getSellerByUserId(userId: string): Promise<Seller | null> {
    const q = query(
      collection(db, COLLECTIONS.SELLERS),
      where('userId', '==', userId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Seller;
    }
    return null;
  }

  static async updateSeller(
    sellerId: string,
    data: Partial<Seller>
  ): Promise<void> {
    const sellerRef = doc(db, COLLECTIONS.SELLERS, sellerId);
    await updateDoc(sellerRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  static async createProduct(
    productData: Omit<
      FirestoreProduct,
      'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount'
    >
  ): Promise<string> {
    const productRef = doc(collection(db, COLLECTIONS.PRODUCTS));
    await setDoc(productRef, {
      ...productData,
      rating: 0,
      reviewCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return productRef.id;
  }

  static async getProduct(productId: string): Promise<FirestoreProduct | null> {
    const productRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() } as FirestoreProduct;
    }
    return null;
  }

  static async getProducts(
    constraints: QueryConstraint[] = [],
    pageSize: number = 20
  ): Promise<{
    products: FirestoreProduct[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
    hasMore: boolean;
  }> {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      ...constraints,
      limit(pageSize)
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as FirestoreProduct
    );
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    return {
      products,
      lastDoc,
      hasMore: querySnapshot.docs.length === pageSize,
    };
  }

  static async getProductsBySeller(
    sellerId: string,
    status?: 'active' | 'inactive' | 'out_of_stock'
  ): Promise<FirestoreProduct[]> {
    const constraints: QueryConstraint[] = [where('sellerId', '==', sellerId)];
    if (status) {
      constraints.push(where('status', '==', status));
    }
    constraints.push(orderBy('createdAt', 'desc'));

    const q = query(collection(db, COLLECTIONS.PRODUCTS), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as FirestoreProduct
    );
  }

  static async updateProduct(
    productId: string,
    data: Partial<FirestoreProduct>
  ): Promise<void> {
    const productRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    await updateDoc(productRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  static async deleteProduct(productId: string): Promise<void> {
    const productRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    await deleteDoc(productRef);
  }

  static async createOrder(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const orderRef = doc(collection(db, COLLECTIONS.ORDERS));
    await setDoc(orderRef, {
      ...orderData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return orderRef.id;
  }

  static async getOrder(orderId: string): Promise<Order | null> {
    const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      return { id: orderSnap.id, ...orderSnap.data() } as Order;
    }
    return null;
  }

  static async getOrdersByBuyer(buyerId: string): Promise<Order[]> {
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('buyerId', '==', buyerId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as Order
    );
  }

  static async getOrdersBySeller(sellerId: string): Promise<Order[]> {
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }) as Order)
      .filter(order => order.items.some(item => item.sellerId === sellerId));
  }

  static async updateOrder(
    orderId: string,
    data: Partial<Order>
  ): Promise<void> {
    const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
    const updateData: any = { ...data, updatedAt: serverTimestamp() };

    if (data.orderStatus === 'shipped' && !data.shippedAt) {
      updateData.shippedAt = serverTimestamp();
    }
    if (data.orderStatus === 'delivered' && !data.deliveredAt) {
      updateData.deliveredAt = serverTimestamp();
    }
    if (data.orderStatus === 'cancelled' && !data.cancelledAt) {
      updateData.cancelledAt = serverTimestamp();
    }

    await updateDoc(orderRef, updateData);
  }

  static async createReview(
    reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpfulCount'>
  ): Promise<string> {
    const reviewRef = doc(collection(db, COLLECTIONS.REVIEWS));
    await setDoc(reviewRef, {
      ...reviewData,
      helpfulCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return reviewRef.id;
  }

  static async getReviewsByProduct(productId: string): Promise<Review[]> {
    const q = query(
      collection(db, COLLECTIONS.REVIEWS),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as Review
    );
  }

  static async updateReview(
    reviewId: string,
    data: Partial<Review>
  ): Promise<void> {
    const reviewRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
    await updateDoc(reviewRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  static async deleteReview(reviewId: string): Promise<void> {
    const reviewRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
    await deleteDoc(reviewRef);
  }

  static async getWishlist(userId: string): Promise<UserWishlist | null> {
    const wishlistRef = doc(db, COLLECTIONS.WISHLISTS, userId);
    const wishlistSnap = await getDoc(wishlistRef);
    if (wishlistSnap.exists()) {
      return { userId, ...wishlistSnap.data() } as UserWishlist;
    }
    return { userId, items: [], updatedAt: Timestamp.now() };
  }

  static async updateWishlist(
    userId: string,
    items: UserWishlist['items']
  ): Promise<void> {
    const wishlistRef = doc(db, COLLECTIONS.WISHLISTS, userId);
    await setDoc(
      wishlistRef,
      {
        userId,
        items,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  static async getCart(userId: string): Promise<UserCart | null> {
    const cartRef = doc(db, COLLECTIONS.CARTS, userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      return { userId, ...cartSnap.data() } as UserCart;
    }
    return { userId, items: [], updatedAt: Timestamp.now() };
  }

  static async updateCart(
    userId: string,
    items: UserCart['items']
  ): Promise<void> {
    const cartRef = doc(db, COLLECTIONS.CARTS, userId);
    await setDoc(
      cartRef,
      {
        userId,
        items,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  static async batchWrite(
    operations: Array<{
      type: 'set' | 'update' | 'delete';
      ref: any;
      data?: any;
    }>
  ): Promise<void> {
    const batch = writeBatch(db);
    operations.forEach(op => {
      if (op.type === 'set') {
        batch.set(op.ref, op.data);
      } else if (op.type === 'update') {
        batch.update(op.ref, op.data);
      } else if (op.type === 'delete') {
        batch.delete(op.ref);
      }
    });
    await batch.commit();
  }
}
