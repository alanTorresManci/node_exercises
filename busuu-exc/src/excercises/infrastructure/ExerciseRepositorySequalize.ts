import { ExerciseModel } from '../domain/exercise.model';
import { Exercise } from '../domain/Exercise.entity';
import { ExerciseRepository } from '../domain/ExerciseRepository';
import { v4 as uuid } from 'uuid';
import { userModel } from "../../users/domain/user.model"

export class ExerciseRepositorySequalize implements ExerciseRepository {
  async findAll(): Promise<Exercise[]> {
    const exerciseModels = await ExerciseModel.findAll({ 
      attributes: ['content', 'id', 'user_id', 'created_at'],
      include: {
        model: userModel,
        as: 'user',
        attributes: ['name']
      } 
    });

    return exerciseModels.map((exerciseModel) => ({
      id: exerciseModel.id,
      user_id: exerciseModel.user_id,
      content: exerciseModel.content,
      created_at: exerciseModel.created_at,
      user: {
        name: exerciseModel.user?.name,
      },
    }));
  }


  async create(exercise: Exercise): Promise<Exercise> {
    const exerciseId = uuid();
    await ExerciseModel.create({
      id: exerciseId,
      user_id: exercise.user_id,
      content: exercise.content,
    }, {
      fields: ['user_id', 'content', 'id']
    });
    const created_exercise_model = await ExerciseModel.findByPk(exerciseId, {
      attributes: ['content', 'id', 'user_id', 'created_at'],
      include: {
        model: userModel,
        as: 'user',
        attributes: ['name']
      } 
    });
    return {
      id: created_exercise_model.id,
      user_id: created_exercise_model.user_id,
      content: created_exercise_model.content,
      created_at: created_exercise_model.created_at,
      user: {
        name: created_exercise_model.user?.name,
      },
    };
  }
}
