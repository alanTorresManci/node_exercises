import sinon from 'sinon';
import chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ExerciseCreatorService } from '../excercises/application/ExerciseCreatorService';
import { ExerciseRepositorySequalize } from '../excercises/infrastructure/ExerciseRepositorySequalize';
import { Exercise } from '../excercises/domain/Exercise.entity';

chai.use(chaiAsPromised);

describe('ExerciseService', () => {
  let exerciseRepo: sinon.SinonStubbedInstance<ExerciseRepositorySequalize>;
  let exerciseService: ExerciseCreatorService;

  beforeEach(() => {
    exerciseRepo = sinon.createStubInstance(ExerciseRepositorySequalize);
    exerciseService = new ExerciseCreatorService(exerciseRepo);
  });

  afterEach(() => {
    sinon.restore();
  });
  describe('selectExcercises',() => {
    it('should get all the excercises',async () => {
      
      const userExercises: Exercise[] = [
        { id: '1', user_id: '1', content: 'Exercise 1' },
        { id: '2', user_id: '1', content: 'Exercise 2' },
      ];

      exerciseRepo.findAll.resolves(userExercises);
      const allExercises = await exerciseRepo.findAll();

      sinon.assert.calledOnce(exerciseRepo.findAll);
      expect(allExercises).to.be.equal(userExercises);
    });
    it('should get return empty array if there are no excercises',async () => {
      
      const userExercises: Exercise[] = [];

      exerciseRepo.findAll.resolves(userExercises);
      const allExercises = await exerciseRepo.findAll();

      sinon.assert.calledOnce(exerciseRepo.findAll);
      expect(allExercises).to.be.empty;
    });
  })
  describe('createExercise', () => {
    it('should create a new exercise when user has less than 10 exercises', async () => {
      // Arrange
      const user_id = '1';
      const content = 'Test exercise';
      const userExercises: Exercise[] = [
        { id: '1', user_id: '1', content: 'Exercise 1' },
        { id: '2', user_id: '1', content: 'Exercise 2' },
      ];

      exerciseRepo.findAll.resolves(userExercises);
      exerciseRepo.create.resolves({ id: '2', user_id: user_id, content: content });

      // Act
      const createdExercise = await exerciseService.createExercise(user_id, content);

      // Assert
      sinon.assert.calledOnce(exerciseRepo.create);
      sinon.assert.calledWithExactly(exerciseRepo.create, sinon.match({ user_id, content }));
      expect(createdExercise).to.have.property('id');
      expect(createdExercise).to.have.property('user_id', user_id);
      expect(createdExercise).to.have.property('content', content);
    });

    it('should throw an error when user has 10 or more exercises', async () => {
      // Arrange
      const user_id = '1';
      const content = 'Test exercise';
      const userExercises: Exercise[] = [
        { id: '1', user_id: '1', content: 'Exercise 1' },
        { id: '2', user_id: '1', content: 'Exercise 2' },
        { id: '3', user_id: '1', content: 'Exercise 3' },
        { id: '4', user_id: '1', content: 'Exercise 4' },
        { id: '5', user_id: '1', content: 'Exercise 5' },
        { id: '6', user_id: '1', content: 'Exercise 6' },
        { id: '7', user_id: '1', content: 'Exercise 7' },
        { id: '8', user_id: '1', content: 'Exercise 8' },
        { id: '9', user_id: '1', content: 'Exercise 9' },
        { id: '10', user_id: '1', content: 'Exercise 10' },
      ];

      exerciseRepo.findAll.resolves(userExercises);

      // Act and Assert
      await expect(exerciseService.createExercise(user_id, content)).to.be.rejectedWith('User already has 10 exercises');
      sinon.assert.notCalled(exerciseRepo.create);
    });
    it('should throw an error when content is greater than 100 characters',async () => {
      const user_id = '1';
      const content = 'a'.repeat(101);
      const userExercises: Exercise[] = [
        { id: '1', user_id: '1', content: 'Exercise 1' },
        { id: '2', user_id: '1', content: 'Exercise 2' },
      ];

      exerciseRepo.findAll.resolves(userExercises);

      await expect(exerciseService.createExercise(user_id, content)).to.be.rejectedWith('Exercise content too long');
      sinon.assert.notCalled(exerciseRepo.create);
    });
    it('should create exercise when content is equal to 100 characters',async () => {
      const user_id = '1';
      const content = 'a'.repeat(100);
      const userExercises: Exercise[] = [
        { id: '1', user_id: '1', content: 'Exercise 1' },
        { id: '2', user_id: '1', content: 'Exercise 2' },
      ];

      exerciseRepo.findAll.resolves(userExercises);
      exerciseRepo.create.resolves({ id: '2', user_id: user_id, content: content });
      const createdExercise = await exerciseService.createExercise(user_id, content);

      sinon.assert.calledOnce(exerciseRepo.create);
      sinon.assert.calledWithExactly(exerciseRepo.create, sinon.match({ user_id, content }));
      expect(createdExercise).to.have.property('id');
      expect(createdExercise).to.have.property('user_id', user_id);
      expect(createdExercise).to.have.property('content', content);
    });
  });
});
