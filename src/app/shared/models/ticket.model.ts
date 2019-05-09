import { UserModel } from './user.model';

export interface TicketModel {
  id: number;
  description: string;
  assigneeId: number;
  completed: boolean;
}

export interface TicketViewModel extends TicketModel {
  assignee: UserModel;
}
