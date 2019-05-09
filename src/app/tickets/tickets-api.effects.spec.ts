import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { BackendService } from '../backend.service';
import { TicketsPageActions, TicketsApiActions } from './actions';
import { TicketsApiEffects } from './tickets-api.effects';
import { UserModel, TicketModel } from '../shared/models';

describe('Tickets API Effects', () => {
  let effects: TicketsApiEffects;
  let actions$: Observable<any>;
  let backendService: {
    users: jasmine.Spy;
    tickets: jasmine.Spy;
    complete: jasmine.Spy;
  };
  let snackbar: {
    open: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TicketsApiEffects,
        provideMockActions(() => actions$),
        {
          provide: BackendService,
          useFactory() {
            backendService = {
              users: jasmine.createSpy(),
              tickets: jasmine.createSpy(),
              complete: jasmine.createSpy(),
            };

            return backendService;
          },
        },
        {
          provide: MatSnackBar,
          useFactory() {
            snackbar = {
              open: jasmine.createSpy(),
            };

            return snackbar;
          },
        },
      ],
    });

    effects = TestBed.get(TicketsApiEffects);
  });

  it('should get all users and tickets when the user enters the tickets page', () => {
    const inputAction = TicketsPageActions.createEnterAction();
    const users: UserModel[] = [{ id: 1, name: 'Mike' }];
    const tickets: TicketModel[] = [
      { id: 2, description: '', completed: false, assigneeId: 1 },
    ];
    const expectedAction = TicketsApiActions.createLoadUsersAndTicketsSuccessAction(
      users,
      tickets,
    );
    actions$ = of(inputAction);
    backendService.users.and.returnValue(of(users));
    backendService.tickets.and.returnValue(of(tickets));
    const nextCallback = jasmine.createSpy();

    const subscription = effects.loadUsersAndTickets$.subscribe(nextCallback);

    expect(nextCallback).toHaveBeenCalledWith(expectedAction);

    subscription.unsubscribe();
  });

  it('should handle saving the completion status with cancelation for multiple tickets', () => {
    const firstInputAction = TicketsPageActions.createToggleTicketCompleteAction(1, true);
    const secondInputAction = TicketsPageActions.createToggleTicketCompleteAction(2, false);
    const firstOutputAction = TicketsApiActions.createSaveCompleteStatusSuccessAction(1);
    const secondOutputAction = TicketsApiActions.createSaveCompleteStatusSuccessAction(2);

    actions$ = hot('-a-b-a-b-a----b---', {
      a: firstInputAction,
      b: secondInputAction,
    });
    const request$ = cold('-----c|');
    const expected$ = cold('------------e-d----e-', {
      d: firstOutputAction,
      e: secondOutputAction,
    });
    backendService.complete.and.returnValue(request$);

    expect(effects.saveCompleteStatus$).toBeObservable(expected$);
  });
});
