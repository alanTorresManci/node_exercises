import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { userModel } from '../../users/domain/user.model';

export class ExerciseModel extends Model {
  public id!: string;
  public user_id!: string;
  public content!: string;
  public created_at?: string;
  public user!: userModel;
}

ExerciseModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'exercises',
    sequelize,
    timestamps: false
  },
);

ExerciseModel.belongsTo(userModel, {
  as: 'user',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
