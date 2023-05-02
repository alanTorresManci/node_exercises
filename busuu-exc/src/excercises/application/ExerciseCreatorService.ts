import { Exercise } from '../domain/Exercise.entity';
import { ExerciseRepository } from '../domain/ExerciseRepository';

export class ExerciseCreatorService {
  constructor(private readonly repository: ExerciseRepository) {}

  async createExercise(user_id: string, content: string): Promise<Exercise> {
    const exercises = await this.repository.findAll();
    const userExercises = exercises.filter((e) => e.user_id === user_id);
    const exercise = new Exercise(user_id, content, userExercises.length);
    return this.repository.create(exercise);
  }
}
