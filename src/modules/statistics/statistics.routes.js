import {Router} from 'express'
const router = Router();
import statisticsController from './statistics.cotroller.js'

router.get('/getAllRevenuesOfAllMembers',statisticsController.getAllRevenuesOfAllMembers);
router.get('/getRevenuesOfSpecificTrainer',statisticsController.getRevenuesOfSpecificTrainer)

export default router;