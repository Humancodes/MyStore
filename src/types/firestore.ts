import type { Timestamp } from 'firebase/firestore';
import type { UserRole } from './roles';

export interface FirestoreUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Seller {
  id: string;
  userId: string;
  businessName: string;
  businessDescription?: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  taxId?: string;
  bankAccount?: {
    accountNumber: string;
    bankName: string;
    ifscCode?: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  approvedAt?: Timestamp;
}

export interface FirestoreProduct {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  featured?: boolean;
  tags?: string[];
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
  sellerId: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  buyerId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'upi' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  orderStatus:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  shippedAt?: Timestamp;
  deliveredAt?: Timestamp;
  cancelledAt?: Timestamp;
  trackingNumber?: string;
  notes?: string;
}

export interface Review {
  id: string;
  productId: string;
  buyerId: string;
  buyerName: string;
  buyerPhoto?: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  sellerResponse?: {
    message: string;
    respondedAt: Timestamp;
  };
}

export interface WishlistItem {
  productId: string;
  addedAt: Timestamp;
}

export interface UserWishlist {
  userId: string;
  items: WishlistItem[];
  updatedAt: Timestamp;
}

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Timestamp;
}

export interface UserCart {
  userId: string;
  items: CartItem[];
  updatedAt: Timestamp;
}
