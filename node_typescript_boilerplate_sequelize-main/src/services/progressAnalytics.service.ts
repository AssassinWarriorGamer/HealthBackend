/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize';
import HealthMetricsModel from '@models/healthMetrics.model';
import GoalModel from '@models/goals.model';

class ProgressAnalyticsService {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  /**
   * Fetch progress analytics for a user.
   */
  public async getProgressAnalytics(userId: number) {
    try {
      // Initialize models
      const HealthMetrics = HealthMetricsModel(this.sequelize); // Initialize HealthMetrics model
      const Goal = GoalModel(this.sequelize); // Initialize Goal model

      // Fetch health metrics for the user
      const healthMetrics = await HealthMetrics.findAll({ where: { user_Id: userId } });

      // Fetch goals for the user
      const goals = await Goal.findAll({ where: { user_Id: userId } });

      // Perform analytics (e.g., calculate progress percentages for goals)
      const analytics = goals.map(goal => {
        let totalAchieved = 0;

        // Perform calculation based on the goal type
        if (goal.type === 'steps') {
          // For "steps" goal, sum the steps from health metrics
          totalAchieved = healthMetrics.reduce((sum, metric) => sum + (metric.steps || 0), 0);
        } else if (goal.type === 'weight') {
          // For "weight" goal, sum the weight from health metrics (if needed)
          totalAchieved = healthMetrics.reduce((sum, metric) => sum + (metric.weight || 0), 0);
        }
        // Add other types like 'calories' if needed, based on your model

        // Calculate the progress percentage
        const progressPercentage = Math.min((totalAchieved / goal.targetValue) * 100, 100);

        return {
          goalId: goal.goal_id,
          type: goal.type,
          targetValue: goal.targetValue,
          totalAchieved,
          progressPercentage,
          status: goal.status,
        };
      });

      return analytics;
    } catch (error) {
      throw new Error(`Error fetching progress analytics: ${error.message}`);
    }
  }
}

export default ProgressAnalyticsService;
