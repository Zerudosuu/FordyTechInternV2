import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./creds.json" assert { type: "json" }; // Adjust the path if needed

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export { db }; // Named export
