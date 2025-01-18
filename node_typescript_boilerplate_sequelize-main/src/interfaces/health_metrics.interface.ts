/* eslint-disable prettier/prettier */
export interface health_metrics {
  metric_id: number;
  user_Id: number; 
  height?: number;
  weight?: number; 
  bloodPressure?: string;
  steps: number; 
  heartRate?: number; 
  createdAt?: Date; 
  updatedAt?: Date; 
}
