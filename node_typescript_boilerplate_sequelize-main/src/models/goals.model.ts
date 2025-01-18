/* eslint-disable prettier/prettier */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { goals } from '@interfaces/goals.interface';

export type GoalCreationAttributes = Optional<goals, 'goal_id'>;

export class GoalModel extends Model<goals, GoalCreationAttributes> implements goals {
  public goal_id: number;
  public user_Id: number;
  public type: string; // 'steps', 'calories', 'distance'
  public targetValue: number;
  public status: 'active' | 'completed' | 'expired'; // Matches the interface
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof GoalModel {
  GoalModel.init(
    {
      goal_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_Id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      targetValue: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('active', 'completed', 'expired'), // Restricting values
        defaultValue: 'active',
      },
    },
    {
      tableName: 'goals',
      sequelize,
    },
  );

  return GoalModel;
}
