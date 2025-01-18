/* eslint-disable prettier/prettier */
import { Router } from 'express';
import ProgressAnalyticsController from '@controllers/progressanalytics.controller';

const router = Router();
const progressAnalyticsController = new ProgressAnalyticsController();

// Route to get progress analytics for a user
router.get('/:userId', progressAnalyticsController.getProgressAnalytics);

export default router;
