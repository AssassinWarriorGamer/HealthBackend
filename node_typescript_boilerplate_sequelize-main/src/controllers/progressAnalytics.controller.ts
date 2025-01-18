/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import ProgressAnalyticsService from '@services/progressAnalytics.service';
import { sequelize } from '@models';// Import sequelize instance from wherever it is initialized

class ProgressAnalyticsController {
  private progressAnalyticsService: ProgressAnalyticsService;

  constructor() {
    // Pass the sequelize instance to the ProgressAnalyticsService
    this.progressAnalyticsService = new ProgressAnalyticsService(sequelize);
  }

  /**
   * Get progress analytics for a user
   */
  public getProgressAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const analytics = await this.progressAnalyticsService.getProgressAnalytics(userId);
      res.status(200).json({ data: analytics });
    } catch (error) {
      next(error);
    }
  };
}

export default ProgressAnalyticsController;
