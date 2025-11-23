/**
 * Authentication Service
 *
 * This service handles all authentication operations:
 * - Email/Password signup
 * - Email/Password login
 * - Google Sign-In
 * - Logout
 * - Password reset
 * - User state management
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * Sign up a new user with email and password
 */
export async function signUp(
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update user profile with display name if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
    }

    return userCredential;
  } catch (error: any) {
    // Handle specific Firebase errors
    throw handleAuthError(error);
  }
}

/**
 * Sign in an existing user with email and password
 */
export async function signIn(
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw handleAuthError(error);
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<UserCredential> {
  try {
    const provider = new GoogleAuthProvider();
    // Add additional scopes if needed
    provider.addScope('profile');
    provider.addScope('email');

    return await signInWithPopup(auth, provider);
  } catch (error: any) {
    throw handleAuthError(error);
  }
}

/**
 * Sign out the current user
 */
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw handleAuthError(error);
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw handleAuthError(error);
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Handle Firebase authentication errors and convert to user-friendly messages
 */
function handleAuthError(error: any): Error {
  let message = 'An error occurred during authentication';

  switch (error.code) {
    case 'auth/email-already-in-use':
      message = 'This email is already registered. Please sign in instead.';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address. Please check and try again.';
      break;
    case 'auth/operation-not-allowed':
      message = 'This sign-in method is not enabled. Please contact support.';
      break;
    case 'auth/weak-password':
      message = 'Password is too weak. Please use at least 6 characters.';
      break;
    case 'auth/user-disabled':
      message = 'This account has been disabled. Please contact support.';
      break;
    case 'auth/user-not-found':
      message = 'No account found with this email. Please sign up first.';
      break;
    case 'auth/wrong-password':
      message = 'Incorrect password. Please try again.';
      break;
    case 'auth/too-many-requests':
      message =
        'Too many failed attempts. Please try again later or reset your password.';
      break;
    case 'auth/popup-closed-by-user':
      message = 'Sign-in popup was closed. Please try again.';
      break;
    case 'auth/cancelled-popup-request':
      message = 'Only one popup request is allowed at a time.';
      break;
    case 'auth/network-request-failed':
      message = 'Network error. Please check your internet connection.';
      break;
    default:
      message = error.message || message;
  }

  return new Error(message);
}
