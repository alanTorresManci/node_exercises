import { Exercise } from './Exercise.entity';

export interface ExerciseRepository {
  findAll(): Promise<Exercise[]>;
  create(exercise: Exercise): Promise<Exercise>;
}
