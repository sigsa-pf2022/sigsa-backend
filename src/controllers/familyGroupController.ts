import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../index';
import FamilyGroup from '../models/FamilyGroup';
import RawFamilyGroupData from '../models/RawFamilyGroupData';
import { uploadImageToStorage } from './uploadFileController';

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

const newFamilyGroup = async (dependentData, familyGroupData) => {
  const dependentRef = db.collection('dependent').doc();
  const familyGroupRef = db.collection('familyGroups').doc();
  dependentRef.set(dependentData).then(() => {
    familyGroupData.dependent = dependentRef.id;
    familyGroupRef.set(familyGroupData);
  });
};

const createGroup = async (req, res) => {
  const file = req.file;
  const newFileName = `${file.originalname.split('.')[0]}_${Date.now()}`;
  console.log(req.body.birthday);
  const date = req.body.birthday.split('/');
  const dependentData = {
    dni: req.body.dni,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    birthday: Timestamp.fromDate(new Date(date[2], date[1], date[0])),
    blood_type: req.body.bloodType,
  };
  const familyGroupData = {
    createdBy: req.body.createdBy,
    name: req.body.name,
    img_url: newFileName,
  };
  if (file) {
    uploadImageToStorage(file, newFileName)
      .then((success) => {
        newFamilyGroup(dependentData, familyGroupData).then((ok) => {
          res.status(200);
          res.send();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export { getFamilyGroups, newFamilyGroup, createGroup };
