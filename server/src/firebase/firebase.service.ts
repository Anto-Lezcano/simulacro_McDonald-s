import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import * as serviceAccount from "./firebaseConfig.json";

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor() {
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount
        ),
      });
    } else {
      this.firebaseApp = admin.app(); // usa la app existente
    }
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return await admin.auth().verifyIdToken(idToken);
  }
}
