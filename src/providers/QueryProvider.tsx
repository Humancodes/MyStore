'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/**
 * QueryProvider - Wraps the app with React Query
 * 
 * React Query (TanStack Query) is used for:
 * - Server state management (API data)
 * - Automatic caching and background refetching
 * - Loading and error states
 * - Optimistic updates
 * 
 * Key Features:
 * - staleTime: How long data is considered fresh (5 minutes)
 * - cacheTime: How long unused data stays in cache (10 minutes)
 * - refetchOnWindowFocus: Refetch when user returns to tab
 * - retry: Retry failed requests 1 time
 */
export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create QueryClient with optimal settings
  // Using useState to ensure single instance across re-renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 5 minutes
            // During this time, React Query won't refetch
            staleTime: 1000 * 60 * 5, // 5 minutes

            // Unused data stays in cache for 10 minutes
            // After this, it's garbage collected
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)

            // Refetch when window regains focus
            // Keeps data fresh when user returns to tab
            refetchOnWindowFocus: true,

            // Refetch on reconnect (when internet comes back)
            refetchOnReconnect: true,

            // Don't refetch on mount if data is fresh
            // Set to false to use cached data immediately
            // Individual queries can override this
            refetchOnMount: false,

            // Retry failed requests once
            retry: 1,

            // Retry delay increases exponentially
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // Retry failed mutations once
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query DevTools - only shows in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}


