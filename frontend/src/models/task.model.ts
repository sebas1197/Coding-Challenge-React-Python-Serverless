export interface Task {
  id: number
  title: string
  description: string
  status: TASK_STATUS
}

export enum TASK_STATUS {
  TO_DO = 'To do',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
};