import { DocumentData, Timestamp } from 'firebase-admin/firestore';
import { db } from '..';

export default class Dependent {
  dni: number | undefined;
  last_name: string | undefined;
  blood_type: string | undefined;
  birthday: Timestamp | undefined;
  first_name: string | undefined;
  constructor() {}

  async createById(id: string) {
    const doc = await db.collection('dependent').doc(id).get();
    const data = doc.data();
    if (data) {
      this.dni = data.dni;
      this.last_name = data.first_name;
      this.first_name = data.first_name;
      this.birthday = data.birthday;
      this.blood_type = data.blood_type;
    }
    return this;
  }
}
