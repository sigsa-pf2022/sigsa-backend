// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import bp from 'body-parser';
import router from './routes';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import serviceAccount from '../firebase.json';
import cors from 'cors';
import multer from 'multer';
const credentials = serviceAccount as admin.ServiceAccount;
const BUCKET = 'sigsa-2022.appspot.com';
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();
const db = getFirestore();
const app = express();
const PORT = process.env.PORT;

app.use(logger('dev'));
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.text({ limit: '600mb' }));
app.use(express.urlencoded({ extended: false })); //http://expressjs.com/en/5x/api.html#express.urlencoded
app.use('/', router);
const server = app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});

export { admin, db, app, server, bucket };
