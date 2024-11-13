import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { readFile } from "fs/promises";
import * as admin from "firebase-admin";
import { ConfigService } from "@nestjs/config";

let app: admin.app.App = null;
@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
    constructor(private configService: ConfigService) {}

    async onApplicationBootstrap() {
        if (!app) {
            const firebaseServiceAccountFile = await readFile(this.configService.get<string>('SA_KEY'), "utf8");
            const serviceAccount = await JSON.parse(firebaseServiceAccountFile);
            app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
    }
    setup() {
        return app;
    }
}