import { Router } from 'express';
import { getFamilyGroups } from '../controllers/familyGroupController';
const router = Router();

router.get('/family-groups', getFamilyGroups);

export default router;
