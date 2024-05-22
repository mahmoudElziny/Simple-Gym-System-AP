import {Router} from 'express'
const router = Router();
import trainerController from './trainer.controller.js'

router.post('/addTrainer', trainerController.addTrainer);
router.put('/updateTrainer', trainerController.updateTrainer);
router.delete('/deleteTrainer', trainerController.deleteTrainer);
router.get('/getAllTrainersAndTrainersMembers',trainerController.getAllTrainersAndTrainersMembers);
router.get('/getSpecificTrainerAndTrainersMembers',trainerController.getSpecificTrainerAndTrainersMembers);

export default router;