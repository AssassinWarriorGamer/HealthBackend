/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { HealthMetricsModel } from '@models/healthMetrics.model';
import { health_metrics } from '@interfaces/health_metrics.interface';

class HealthMetricsService {
  /**
   * Get health metrics by user ID
   * @param userId The ID of the user
   * @returns Array of health metrics for the user
   */
  public async getHealthMetricsByUserId(userId: number): Promise<health_metrics[]> {
    if (isEmpty(userId)) throw new HttpException(400, 'User ID is required');

    const healthMetrics = await HealthMetricsModel.findAll({ where: { user_Id: userId } });
    if (!healthMetrics) throw new HttpException(404, 'Health metrics not found');

    return healthMetrics;
  }

  /**
   * Add new health metrics for a user
   * @param data The health metrics data to add
   * @returns The created health metrics entry
   */
  public async addHealthMetrics(data: health_metrics): Promise<health_metrics> {
    if (isEmpty(data)) throw new HttpException(400, 'Health metrics data is required');

    const createdHealthMetrics = await HealthMetricsModel.create(data);
    return createdHealthMetrics;
  }

  /**
   * Update health metrics for a user
   * @param metricId The ID of the health metric entry to update
   * @param data The updated health metrics data
   * @returns The updated health metrics entry
   */
  public async updateHealthMetrics(metricId: number, data: Partial<health_metrics>): Promise<health_metrics> {
    if (isEmpty(metricId)) throw new HttpException(400, 'Metric ID is required');
    if (isEmpty(data)) throw new HttpException(400, 'Health metrics data is required');

    const metricToUpdate = await HealthMetricsModel.findByPk(metricId);
    if (!metricToUpdate) throw new HttpException(404, 'Health metrics not found');

    await metricToUpdate.update(data);
    return metricToUpdate;
  }

  /**
   * Delete health metrics by ID
   * @param metricId The ID of the health metrics entry to delete
   * @returns A success message
   */
  public async deleteHealthMetrics(metricId: number): Promise<string> {
    if (isEmpty(metricId)) throw new HttpException(400, 'Metric ID is required');

    const metricToDelete = await HealthMetricsModel.findByPk(metricId);
    if (!metricToDelete) throw new HttpException(404, 'Health metrics not found');

    await metricToDelete.destroy();
    return 'Health metrics entry deleted successfully';
  }
}

export default HealthMetricsService;
