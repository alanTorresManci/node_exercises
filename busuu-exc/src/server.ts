import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { CreateExercisePostController } from './interfaces/controllers/exercices/CreateExcercisePostController';
import { SelectAllExercisesGetController } from './interfaces/controllers/exercices/SelectAllExcercisesGetController';
import { exerciseRoutes } from './interfaces/routes/exerciseRoutes';
import { ExerciseRepositorySequalize } from './excercises/infrastructure/ExerciseRepositorySequalize';
import { ExerciseCreatorService } from './excercises/application/ExerciseCreatorService';
import { ExerciseSelectorService } from './excercises/application/ExcerciseSelectorService';
import { connectToDatabase } from './config/database';


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


const exerciseRepository = new ExerciseRepositorySequalize();
//creation 
const exerciseCreatorService = new ExerciseCreatorService(exerciseRepository);
const createExerciseController = new CreateExercisePostController(exerciseCreatorService);
//selection
const excerciseSelectorService = new ExerciseSelectorService(exerciseRepository);
const getAllExercisesController = new SelectAllExercisesGetController(excerciseSelectorService);
const router = exerciseRoutes(createExerciseController, getAllExercisesController);

app.use('/exercises', router);


async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
startServer();
export { app };
