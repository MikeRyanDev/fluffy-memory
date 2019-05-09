import { TicketsPageActions, TicketsApiActions } from 'src/app/tickets/actions';
import { reducer, initialState, selectAll } from './tickets.reducer';
import { TicketModel } from '../models';

describe('Tickets Reducer', () => {
  const mockTicket: TicketModel = {
    id: 0,
    assigneeId: 1,
    completed: false,
    description: 'Test Ticket',
  };

  it('should return an initial state if a state is not provided', () => {
    const state = reducer(undefined, { type: '@@init' } as any);

    expect(state).toBe(initialState);
  });

  it('should add all tickets to the state when they are loaded', () => {
    const tickets: TicketModel[] = [mockTicket];
    const inputAction = TicketsApiActions.createLoadUsersAndTicketsSuccessAction([], tickets);

    const state = reducer(initialState, inputAction);

    expect(selectAll(state)).toEqual(tickets);
  });

  it('should mark a ticket as complete when the user toggles the completion status', () => {
    const tickets: TicketModel[] = [mockTicket];
    const inputActions = [
      TicketsApiActions.createLoadUsersAndTicketsSuccessAction([], tickets),
      TicketsPageActions.createToggleTicketCompleteAction(mockTicket.id, true),
    ];

    const state = inputActions.reduce(reducer, initialState);
    const [ticket] = selectAll(state);

    expect(ticket.completed).toBe(true);
  });
});
