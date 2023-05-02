import { Request, Response } from 'express';
import { ExerciseCreatorService } from '../../../excercises/application/ExerciseCreatorService';

export class CreateExercisePostController {
  constructor(private readonly service: ExerciseCreatorService) {}

  async createExercise(req: Request, res: Response): Promise<void> {
    const { user_id, content } = req.body;
    try {
      const exercise = await this.service.createExercise(user_id, content);
      res.status(201).json(exercise);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
