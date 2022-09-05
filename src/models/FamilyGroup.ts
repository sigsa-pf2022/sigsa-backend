import Dependent from './Dependent';
import RawFamilyGroupData from './RawFamilyGroupData';
import User from './User';

export default class FamilyGroup {
  createdBy: User = new User();
  name = '';
  members: User[] = [];
  img_url = '';
  dependent: Dependent = new Dependent();
  constructor() {}

  async create(data: RawFamilyGroupData) {
    this.createdBy = await this.newUser(data.createdBy);
    this.name = data.name;
    this.members = await this.createMembers(data.members);
    this.img_url = data.img_url;
    this.dependent = await new Dependent().createById(data.dependent);
    return this;
  }

  private async createMembers(membersUid: string[]) {
    const members: User[] = [];
    for (const uid of membersUid) {
      members.push(await this.newUser(uid));
    }
    return members;
  }

  private async newUser(uid: string) {
    return await new User().create(uid);
  }
}
