/* eslint-disable prettier/prettier */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { health_metrics } from '@interfaces/health_metrics.interface';

// Define the attributes that are optional when creating a health_metrics record
export type HealthMetricsCreationAttributes = Optional<health_metrics, 'metric_id' | 'createdAt' | 'updatedAt'>;

export class HealthMetricsModel extends Model<health_metrics, HealthMetricsCreationAttributes> implements health_metrics {
  public metric_id!: number; // Use non-optional (!) to indicate required fields
  public user_Id!: number;
  public height?: number; // Optional properties (?)
  public weight?: number;
  public bloodPressure?: string;
  public steps!: number;
  public heartRate?: number;

  public readonly createdAt!: Date; // Timestamps
  public readonly updatedAt!: Date;
}

// Sequelize model initialization
export default function (sequelize: Sequelize): typeof HealthMetricsModel {
  HealthMetricsModel.init(
    {
      metric_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_Id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      bloodPressure: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      steps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      heartRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'health_metrics',
      sequelize,
    }
  );

  return HealthMetricsModel;
}
