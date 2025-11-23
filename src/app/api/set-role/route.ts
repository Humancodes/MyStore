import { NextRequest, NextResponse } from 'next/server';
import { setUserRoles, addUserRole } from '@/services/roleService';
import type { UserRole } from '@/types/roles';

let adminAuth: any = null;

try {
  const { getAuth } = require('firebase-admin/auth');
  const { initializeApp, getApps, cert } = require('firebase-admin/app');

  let adminApp: any;

  if (getApps().length === 0) {
    const serviceAccount = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    if (serviceAccount.privateKey && serviceAccount.clientEmail) {
      adminApp = initializeApp({
        credential: cert(serviceAccount as any),
      });
      adminAuth = getAuth(adminApp);
    }
  } else {
    adminApp = getApps()[0];
    adminAuth = getAuth(adminApp);
  }
} catch (error) {
  console.log(
    'Firebase Admin SDK not available. Roles will be stored in Firestore only.'
  );
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

    if (!idToken || !adminAuth) {
      return NextResponse.json({
        success: true,
        message: 'Role set in Firestore',
      });
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);

      if (decodedToken.uid !== uid) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }

      await adminAuth.setCustomUserClaims(uid, { role });

      return NextResponse.json({
        success: true,
        message: 'Role set in custom claims and Firestore',
      });
    } catch (error: any) {
      console.error('Error setting custom claims:', error);
      return NextResponse.json({
        success: true,
        message: 'Role set in Firestore (custom claims failed)',
      });
    }
  } catch (error: any) {
    console.error('Error in set-role API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
