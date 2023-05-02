import { Exercise } from '../domain/Exercise.entity';
import { ExerciseRepository } from '../domain/ExerciseRepository';

export class ExerciseSelectorService {
  constructor(private readonly repository: ExerciseRepository) {}

  async getAllExercises(): Promise<Exercise[]> {
    return this.repository.findAll();
  }
}
