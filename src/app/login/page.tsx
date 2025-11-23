'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import AuthErrorAlert from '@/components/auth/AuthErrorAlert';
import { useAppSelector } from '@/store/hooks';

export default function LoginPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">
            Login to access your account (Buyer or Seller)
          </p>
        </div>

        <AuthErrorAlert />

        <div className="space-y-4">
          <LoginForm />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <GoogleSignInButton />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Want to sell?{' '}
            <Link href="/seller/register" className="text-primary hover:underline font-medium">
              Become a Seller
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

