import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Use environment variables for the service account key
// Never commit these keys directly into the codebase!

if (!getApps().length) {
  try {
    // If you have a service account JSON, you can set it via an env variable
    // FIREBASE_SERVICE_ACCOUNT_KEY='{ "type": "service_account", "project_id": "..." }'
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : undefined;

    initializeApp({
      credential: serviceAccount ? cert(serviceAccount) : undefined,
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
  }
}

// Export a mock "admin" object to keep our API routes compatible
const auth = getAuth();
export const admin = {
  auth: () => auth
};
