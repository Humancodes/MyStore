import { NextRequest, NextResponse } from 'next/server';
import { setUserRoles, addUserRole } from '@/services/roleService';
import type { UserRole } from '@/types/roles';

type AdminAuth = {
  verifyIdToken: (token: string) => Promise<{ uid: string }>;
  setCustomUserClaims: (uid: string, claims: { role: string }) => Promise<void>;
};

let adminAuth: AdminAuth | null = null;

async function initializeAdminAuth() {
  if (adminAuth) return adminAuth;

  try {
    const adminAuthModule = await import('firebase-admin/auth');
    const adminAppModule = await import('firebase-admin/app');
    const { getAuth } = adminAuthModule;
    const { initializeApp, getApps, cert } = adminAppModule;

    let adminApp;

    if (getApps().length === 0) {
      const serviceAccount = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      };

      if (serviceAccount.privateKey && serviceAccount.clientEmail) {
        adminApp = initializeApp({
          credential: cert(serviceAccount),
        });
        adminAuth = getAuth(adminApp);
      }
    } else {
      adminApp = getApps()[0];
      adminAuth = getAuth(adminApp);
    }
    return adminAuth;
  } catch (error) {
    console.log(
      'Firebase Admin SDK not available. Roles will be stored in Firestore only.'
    );
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, role, idToken, action = 'add' } = body;

    if (!uid || !role) {
      return NextResponse.json(
        { error: 'UID and role are required' },
        { status: 400 }
      );
    }

    if (action === 'add') {
      await addUserRole(uid, role as UserRole);
    } else if (action === 'set') {
      const roles = {
        buyer: role === 'buyer',
        seller: role === 'seller',
        admin: role === 'admin',
      };
      await setUserRoles(uid, roles);
    }

    const auth = await initializeAdminAuth();
    if (!idToken || !auth) {
      return NextResponse.json({
        success: true,
        message: 'Role set in Firestore',
      });
    }

    try {
      const decodedToken = await auth.verifyIdToken(idToken);

      if (decodedToken.uid !== uid) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }

      await auth.setCustomUserClaims(uid, { role });

      return NextResponse.json({
        success: true,
        message: 'Role set in custom claims and Firestore',
      });
    } catch (error) {
      console.error('Error setting custom claims:', error);
      return NextResponse.json({
        success: true,
        message: 'Role set in Firestore (custom claims failed)',
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    console.error('Error in set-role API:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
