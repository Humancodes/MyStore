import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ReduxProvider from '@/providers/ReduxProvider';
import QueryProvider from '@/providers/QueryProvider';
import AuthProvider from '@/providers/AuthProvider';
import FirestoreSyncProvider from '@/providers/FirestoreSyncProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mystore.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'MyStore - Your One-Stop Shop',
    template: '%s | MyStore',
  },
  description: 'Discover amazing products at unbeatable prices. Shop now and enjoy fast delivery!',
  keywords: ['online shopping', 'ecommerce', 'products', 'deals', 'shopping'],
  authors: [{ name: 'MyStore' }],
  creator: 'MyStore',
  publisher: 'MyStore',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'MyStore',
    title: 'MyStore - Your One-Stop Shop',
    description: 'Discover amazing products at unbeatable prices. Shop now and enjoy fast delivery!',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyStore - Your One-Stop Shop',
    description: 'Discover amazing products at unbeatable prices. Shop now and enjoy fast delivery!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ReduxProvider>
              <AuthProvider>
                <FirestoreSyncProvider>
                  <Header />
                  {children}
                  <Footer />
                  <Toaster
                    position="top-right"
                    richColors
                    closeButton
                    duration={3000}
                    toastOptions={{
                      classNames: {
                        toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                        description: 'group-[.toast]:text-muted-foreground',
                        actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                      },
                    }}
                  />
                </FirestoreSyncProvider>
              </AuthProvider>
            </ReduxProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
