import {Router} from 'express'
const router = Router();
import memberController from './member.controller.js'

router.post('/addMember', memberController.addMember);
router.put('/updateMember',memberController.updateMember);
router.delete('/deleteMember',memberController.deleteMember);
router.get('/getAllMembersAndMembersTrainer',memberController.getAllMembersAndMembersTrainer);
router.get('/getSpecificMember',memberController.getSpecificMember)

export default router;