import { DocumentData } from 'firebase-admin/firestore';

export default class RawFamilyGroupData implements DocumentData {
  createdBy: string;
  name: string;
  img_url: string;
  members: string[];
  dependent: string;
  constructor(private readonly rawData: DocumentData) {
    this.createdBy = this.rawData.createdBy;
    this.name = this.rawData.name;
    this.img_url = this.rawData.img_url;
    this.dependent = this.rawData.dependent;
    this.members = this.rawData.members;
  }
}
