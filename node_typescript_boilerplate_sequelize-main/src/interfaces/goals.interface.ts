/* eslint-disable prettier/prettier */
export interface goals {
  goal_id: number;
  user_Id: number; 
  type: string;
  targetValue: number;
  status: 'active' | 'completed' | 'expired';
  createdAt?: Date;
  updatedAt?: Date;
}