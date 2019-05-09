import { Action } from '@ngrx/store';
import { UserModel, TicketModel } from 'src/app/shared/models';

export enum Types {
  LoadUsersAndTicketsSuccess = '[Tickets API] Load Users and Tickets Success',
  LoadUsersAndTicketsFailure = '[Tickets API] Load Users and Tickets Failure',
  SaveCompleteStatusSuccess = '[Tickets API] Save Complete Status Success',
  SaveCompleteStatusFailure = '[Tickets API] Save Complete Status Failure',
  RetrySaveCompleteStatus = '[Tickets API] Retry Save Complete Status',
}

export interface LoadUsersAndTicketsSuccessAction extends Action {
  type: Types.LoadUsersAndTicketsSuccess;
  users: UserModel[];
  tickets: TicketModel[];
}

export function createLoadUsersAndTicketsSuccessAction(
  users: UserModel[],
  tickets: TicketModel[],
): LoadUsersAndTicketsSuccessAction {
  return { type: Types.LoadUsersAndTicketsSuccess, users, tickets };
}

export interface LoadUsersAndTicketsFailureAction extends Action {
  type: Types.LoadUsersAndTicketsFailure;
}

export function createLoadUsersAndTicketsFailureAction(): LoadUsersAndTicketsFailureAction {
  return { type: Types.LoadUsersAndTicketsFailure };
}

export interface SaveCompleteStatusSuccessAction extends Action {
  type: Types.SaveCompleteStatusSuccess;
  ticketId: number;
}

export function createSaveCompleteStatusSuccessAction(
  ticketId: number,
): SaveCompleteStatusSuccessAction {
  return { type: Types.SaveCompleteStatusSuccess, ticketId };
}

export interface SaveCompleteStatusFailureAction extends Action {
  type: Types.SaveCompleteStatusFailure;
  ticketId: number;
  isComplete: boolean;
}

export function createSaveCompleteStatusFailureAction(
  ticketId: number,
  isComplete: boolean,
): SaveCompleteStatusFailureAction {
  return { type: Types.SaveCompleteStatusFailure, ticketId, isComplete };
}

export interface RetrySaveCompleteStatusAction {
  type: Types.RetrySaveCompleteStatus;
  ticketId: number;
  isComplete: boolean;
}

export function createRetrySaveCompleteStatusAction(
  ticketId: number,
  isComplete: boolean,
): RetrySaveCompleteStatusAction {
  return { type: Types.RetrySaveCompleteStatus, ticketId, isComplete };
}

export type Union =
  | LoadUsersAndTicketsSuccessAction
  | LoadUsersAndTicketsFailureAction
  | SaveCompleteStatusSuccessAction
  | SaveCompleteStatusFailureAction
  | RetrySaveCompleteStatusAction;
