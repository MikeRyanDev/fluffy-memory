import { Action } from '@ngrx/store';

export enum Types {
  Enter = '[Ticket Details Page Enter',
}

export interface EnterAction extends Action {
  type: Types.Enter;
}

export function createEnterAction(): EnterAction {
  return { type: Types.Enter };
}

export type Union = EnterAction;
