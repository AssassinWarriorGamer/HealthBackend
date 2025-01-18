/* eslint-disable prettier/prettier */
import { Router } from 'express';
import HealthMetricsController from '@controllers/healthmetrics.controller';

const router = Router();
const healthMetricsController = new HealthMetricsController();

// Route to fetch health metrics for a user
router.get('/:userId', healthMetricsController.getHealthMetrics);

// Route to add a new health metrics entry
router.post('/', healthMetricsController.addHealthMetrics);

// Route to update a health metrics entry by ID
router.put('/:metricId', healthMetricsController.updateHealthMetrics);

// Route to delete a health metrics entry by ID
router.delete('/:metricId', healthMetricsController.deleteHealthMetrics);

export default router;
