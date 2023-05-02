import { Request, Response } from 'express';
import { ExerciseSelectorService } from '../../../excercises/application/ExcerciseSelectorService';

export class SelectAllExercisesGetController {
  constructor(private readonly service: ExerciseSelectorService) {}

  async getAllExercises(req: Request, res: Response): Promise<void> {
    try {
        const exercises = await this.service.getAllExercises();
        res.json(exercises);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
    
  }
}
