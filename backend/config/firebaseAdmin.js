const admin = require('firebase-admin');

// Stub returned when Firebase credentials are not configured.
// Allows the server to boot; routes that need Firebase return 503.
const firebaseStub = {
  _isStub: true,
  auth: () => ({
    verifyIdToken: async () => { throw new Error('Firebase Admin not configured (FIREBASE_ADMIN_CREDENTIALS missing).'); },
    getUserByEmail: async () => { throw new Error('Firebase Admin not configured (FIREBASE_ADMIN_CREDENTIALS missing).'); },
    deleteUser: async () => { throw new Error('Firebase Admin not configured (FIREBASE_ADMIN_CREDENTIALS missing).'); },
    generateEmailVerificationLink: async () => { throw new Error('Firebase Admin not configured (FIREBASE_ADMIN_CREDENTIALS missing).'); },
    generatePasswordResetLink: async () => { throw new Error('Firebase Admin not configured (FIREBASE_ADMIN_CREDENTIALS missing).'); },
  }),
  messaging: () => ({
    send: async () => { throw new Error('Firebase Admin not configured.'); },
  }),
  apps: [],
};

function initFirebaseAdmin() {
  if (admin.apps && admin.apps.length) return admin;

  const keyJson = process.env.FIREBASE_ADMIN_CREDENTIALS || null;

  if (!keyJson) {
    console.warn('⚠️  FIREBASE_ADMIN_CREDENTIALS not set — Firebase Admin disabled. Auth/email routes will return 503.');
    return firebaseStub;
  }

  let credential;
  try {
    const parsed = JSON.parse(keyJson);
    credential = admin.credential.cert(parsed);
  } catch (err) {
    console.error('Failed to parse FIREBASE_ADMIN_CREDENTIALS JSON:', err.message);
    console.warn('⚠️  Firebase Admin disabled due to parse error.');
    return firebaseStub;
  }

  const databaseURL = process.env.FIREBASE_REALTIME_DATABASE_URL;
  admin.initializeApp({ credential, databaseURL: databaseURL || undefined });

  console.log('✅ Firebase Admin initialized.');
  return admin;
}

module.exports = initFirebaseAdmin();
