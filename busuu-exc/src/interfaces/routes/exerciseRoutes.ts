import { Router } from 'express';
import { CreateExercisePostController } from '../controllers/exercices/CreateExcercisePostController';

import { SelectAllExercisesGetController } from '../controllers/exercices/SelectAllExcercisesGetController';

export function exerciseRoutes(CreateExercisePostController: CreateExercisePostController, SelectAllExercisesGetController: SelectAllExercisesGetController): Router {
  const router = Router();
  router.get('/', SelectAllExercisesGetController.getAllExercises.bind(SelectAllExercisesGetController));
  router.post('/', CreateExercisePostController.createExercise.bind(CreateExercisePostController));
  return router;
}
