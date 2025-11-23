'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearError } from '@/store/slices/authSlice';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuthErrorAlert() {
  const error = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();

  if (!error) return null;

  return (
    <div className="rounded-md bg-red-50 border border-red-200 p-4">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-red-600 hover:text-red-800"
          onClick={() => dispatch(clearError())}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

