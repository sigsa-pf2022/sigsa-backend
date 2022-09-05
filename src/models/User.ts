import { admin } from '..';

export default class User {
  email: string | undefined;
  displayName: string | undefined;
  photoURL: string | undefined;
  constructor() {}

  async create(uid: string) {
    const user = await admin.auth().getUser(uid);
    this.email = user.email;
    this.displayName = user.displayName;
    this.photoURL = user.photoURL;
    return this;
  }
}
