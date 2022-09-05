require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import bp from 'body-parser';
import router from './routes';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import serviceAccount  from '../firebase.json';

const credentials = serviceAccount as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = getFirestore();
const app = express();
const PORT = process.env.PORT;

app.use(logger('dev'));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false })); //http://expressjs.com/en/5x/api.html#express.urlencoded
app.use('/', router);
const server = app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});

export { admin, db, app, server };
