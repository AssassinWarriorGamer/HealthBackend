/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import HealthMetricsService from '@services/healthMetrics.service';

class HealthMetricsController {
  private healthMetricsService = new HealthMetricsService();

  /**
   * Fetch health metrics by user ID
   */
  public getHealthMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const healthMetrics = await this.healthMetricsService.getHealthMetricsByUserId(userId);
      res.status(200).json({ data: healthMetrics });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Add a new health metrics entry
   */
  public addHealthMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      const newMetric = await this.healthMetricsService.addHealthMetrics(data);
      res.status(201).json({ data: newMetric });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update an existing health metrics entry
   */
  public updateHealthMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const metricId = Number(req.params.metricId);
      const data = req.body;
      const updatedMetric = await this.healthMetricsService.updateHealthMetrics(metricId, data);
      res.status(200).json({ data: updatedMetric });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a health metrics entry by ID
   */
  public deleteHealthMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const metricId = Number(req.params.metricId);
      const message = await this.healthMetricsService.deleteHealthMetrics(metricId);
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };
}

export default HealthMetricsController;
