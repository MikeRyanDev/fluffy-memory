import { Action } from '@ngrx/store';

export enum Types {
  Enter = '[Tickets Page] Enter',
  ToggleTicketComplete = '[Tickets Page] Toggle Ticket Complete',
  FilterByDescription = '[Tickets Page] Filter by Description',
  FilterByUser = '[Tickets Page] Filter by User',
}

export interface EnterAction extends Action {
  type: Types.Enter;
}

export function createEnterAction(): EnterAction {
  return { type: Types.Enter };
}

export interface ToggleTicketCompleteAction extends Action {
  type: Types.ToggleTicketComplete;
  ticketId: number;
  isComplete: boolean;
}

export function createToggleTicketCompleteAction(
  ticketId: number,
  isComplete: boolean,
): ToggleTicketCompleteAction {
  return { type: Types.ToggleTicketComplete, ticketId, isComplete };
}

export interface FilterByDescriptionAction {
  type: Types.FilterByDescription;
  searchTerm: string;
}

export function createFilterByDescriptionAction(
  searchTerm: string,
): FilterByDescriptionAction {
  return { type: Types.FilterByDescription, searchTerm };
}

export interface FilterByUserAction {
  type: Types.FilterByUser;
  userId: number;
}

export function createFilterByUserAction(userId: number): FilterByUserAction {
  return { type: Types.FilterByUser, userId };
}

export type Union =
  | EnterAction
  | ToggleTicketCompleteAction
  | FilterByDescriptionAction
  | FilterByUserAction;
