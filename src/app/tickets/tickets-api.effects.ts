import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, of, forkJoin } from 'rxjs';
import {
  groupBy,
  switchMap,
  mergeMap,
  exhaustMap,
  timeoutWith,
  ignoreElements,
  map,
  catchError,
  concatMap,
} from 'rxjs/operators';
import { BackendService } from '../backend.service';
import { MatSnackBar } from '@angular/material';
import { TicketsPageActions, TicketsApiActions, TicketDetailsPageActions } from './actions';

@Injectable()
export class TicketsApiEffects {
  constructor(
    private actions$: Actions<
      TicketsPageActions.Union | TicketDetailsPageActions.Union | TicketsApiActions.Union
    >,
    private backendService: BackendService,
    private snackbar: MatSnackBar,
  ) {}

  @Effect() loadUsersAndTickets$ = this.actions$.pipe(
    ofType(TicketsPageActions.Types.Enter, TicketDetailsPageActions.Types.Enter),
    exhaustMap(() =>
      forkJoin(this.backendService.users(), this.backendService.tickets()).pipe(
        map(([users, tickets]) =>
          TicketsApiActions.createLoadUsersAndTicketsSuccessAction(users, tickets),
        ),
        catchError(() => of(TicketsApiActions.createLoadUsersAndTicketsFailureAction())),
      ),
    ),
  );

  @Effect() saveCompleteStatus$ = this.actions$.pipe(
    ofType(
      TicketsPageActions.Types.ToggleTicketComplete,
      TicketsApiActions.Types.RetrySaveCompleteStatus,
    ),
    groupBy(
      action => action.ticketId,
      action => action,
      actionsByTicketId$ =>
        actionsByTicketId$.pipe(
          timeoutWith(15 * 1000, EMPTY),
          ignoreElements(),
        ),
    ),
    mergeMap(actionsByTicketId$ => {
      return actionsByTicketId$.pipe(
        switchMap(action => {
          return this.backendService.complete(action.ticketId, action.isComplete).pipe(
            map(() => {
              return TicketsApiActions.createSaveCompleteStatusSuccessAction(action.ticketId);
            }),
            catchError(err => {
              return of(
                TicketsApiActions.createSaveCompleteStatusFailureAction(
                  action.ticketId,
                  action.isComplete,
                ),
              );
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  promptToRetrySavingCompleteStatus$ = this.actions$.pipe(
    ofType(TicketsApiActions.Types.SaveCompleteStatusFailure),
    concatMap(action => {
      return this.snackbar
        .open('Failed to save the ticket', 'Retry')
        .onAction()
        .pipe(
          map(() =>
            TicketsApiActions.createRetrySaveCompleteStatusAction(
              action.ticketId,
              action.isComplete,
            ),
          ),
        );
    }),
  );
}
