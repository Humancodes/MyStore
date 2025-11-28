import { toast } from 'sonner';

export function useNotification() {
  return {
    success: (
      message: string,
      options?: {
        duration?: number;
        action?: {
          label: string;
          onClick: () => void;
        };
      }
    ) => {
      return toast.success(message, {
        duration: options?.duration ?? 3000,
        action: options?.action,
      });
    },

    error: (
      message: string,
      options?: {
        duration?: number;
        action?: {
          label: string;
          onClick: () => void;
        };
      }
    ) => {
      return toast.error(message, {
        duration: options?.duration ?? 5000,
        action: options?.action,
      });
    },

    warning: (
      message: string,
      options?: {
        duration?: number;
        action?: {
          label: string;
          onClick: () => void;
        };
      }
    ) => {
      return toast.warning(message, {
        duration: options?.duration ?? 4000,
        action: options?.action,
      });
    },

    info: (
      message: string,
      options?: {
        duration?: number;
        action?: {
          label: string;
          onClick: () => void;
        };
      }
    ) => {
      return toast.info(message, {
        duration: options?.duration ?? 3000,
        action: options?.action,
      });
    },

    loading: (message: string) => {
      return toast.loading(message);
    },

    promise: <T>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: Error) => string);
      }
    ) => {
      return toast.promise(promise, {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      });
    },

    dismiss: (toastId?: string | number) => {
      toast.dismiss(toastId);
    },

    dismissAll: () => {
      toast.dismiss();
    },
  };
}

export const notificationMessages = {
  cart: {
    added: (productName: string) => `${productName} added to cart`,
    removed: (productName: string) => `${productName} removed from cart`,
    updated: (productName: string) => `${productName} quantity updated`,
    cleared: 'Cart cleared',
    error: 'Failed to update cart',
  },
  wishlist: {
    added: (productName: string) => `${productName} added to wishlist`,
    removed: (productName: string) => `${productName} removed from wishlist`,
    error: 'Failed to update wishlist',
  },
  auth: {
    loginSuccess: 'Welcome back!',
    loginError: 'Failed to login. Please check your credentials.',
    signupSuccess: 'Account created successfully!',
    signupError: 'Failed to create account. Please try again.',
    logoutSuccess: 'Logged out successfully',
    logoutError: 'Failed to logout',
    sessionExpired: 'Your session has expired. Please login again.',
  },
  order: {
    placed: 'Order placed successfully!',
    failed: 'Failed to place order. Please try again.',
    cancelled: 'Order cancelled',
    error: 'An error occurred with your order',
  },
  payment: {
    success: 'Payment successful!',
    failed: 'Payment failed. Please try again.',
    processing: 'Processing your payment...',
    cancelled: 'Payment cancelled',
  },
  product: {
    notFound: 'Product not found',
    loadError: 'Failed to load product',
  },
  review: {
    submitted: 'Review submitted successfully!',
    updated: 'Review updated successfully!',
    deleted: 'Review deleted',
    error: 'Failed to submit review. Please try again.',
    loginRequired: 'Please login to submit a review',
  },
  general: {
    saved: 'Changes saved successfully',
    deleted: 'Item deleted successfully',
    error: 'An error occurred. Please try again.',
    loading: 'Loading...',
    success: 'Operation completed successfully',
  },
};
