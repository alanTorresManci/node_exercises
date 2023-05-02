import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';

export class userModel extends Model {
  public id!: string;
  public name!: string;

}

userModel.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: false
  },
);
