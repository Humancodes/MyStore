'use client';

import { useCartSync } from '@/hooks/useCartSync';
import { useWishlistSync } from '@/hooks/useWishlistSync';

export default function FirestoreSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useCartSync();
  useWishlistSync();

  return <>{children}</>;
}

