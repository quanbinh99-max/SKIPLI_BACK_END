import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": `${process.env.FIREBASE_PROJECT_ID}`,
    "private_key_id": `${process.env.FIREBASE_PRIVATE_KEY_ID}`,
    "private_key": `${process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')}`,
    "client_email": `${process.env.FIREBASE_CLIENT_EMAIL}`,
    "client_id": "117673495936522555440",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40skipli-4ff3d.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }),
});

export const db = admin.firestore()