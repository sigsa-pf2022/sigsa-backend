import { db } from '..';
import FamilyGroup from '../models/FamilyGroup';
import RawFamilyGroupData from '../models/RawFamilyGroupData';

const getFamilyGroups = async (req, res) => {
  const familyGroupsRef = db.collection('familyGroups');
  const queryRef = await familyGroupsRef
    .where('createdBy', '==', req.query.id)
    .get();
  const docs = [];
  queryRef.docs.forEach(async (doc) => {
    const data = new RawFamilyGroupData(doc.data());
    const fg = await new FamilyGroup().create(data);
    res.status(200);
    res.send(fg);
  });
};

export { getFamilyGroups };
