import { db } from '..';
import FamilyGroup from '../models/FamilyGroup';
import RawFamilyGroupData from '../models/RawFamilyGroupData';

const getFamilyGroups = async (req, res) => {
  const familyGroupsRef = db.collection('familyGroups');
  const ownedFamilyGroupsRef = await familyGroupsRef
    .where('createdBy', '==', req.query.id)
    .get();
  const memberFamilyGroupRef = await familyGroupsRef
    .where('members', 'array-contains', req.query.id)
    .get();
  if (ownedFamilyGroupsRef.empty && memberFamilyGroupRef.empty) {
    res.status(200).send();
  }
  const familyGroupsRefs = [
    ...ownedFamilyGroupsRef.docs,
    ...memberFamilyGroupRef.docs,
  ];
  const result: FamilyGroup[] = [];
  for (const doc of familyGroupsRefs) {
    const data = new RawFamilyGroupData(doc.data());
    const fg = await new FamilyGroup().create(data);
    result.push(fg);
  }
  res.status(200);
  res.send(result);
};

export { getFamilyGroups };
