import { Router } from 'express';
import multer from 'multer';
import {
  createGroup,
  getFamilyGroups,
  newFamilyGroup,
} from '../controllers/familyGroupController';
import { downloadImage } from '../controllers/uploadFileController';
const router = Router();
const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
router.get('/family-groups', getFamilyGroups);
router.post('/family-groups', newFamilyGroup);
router.post('/create-group', Multer.single('file'), createGroup);
router.get('/download-image', downloadImage);
export default router;
