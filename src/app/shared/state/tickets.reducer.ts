import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { TicketsPageActions, TicketsApiActions } from '../../tickets/actions';
import { TicketModel } from '../models';

export interface State extends EntityState<TicketModel> {}
export const adapter = createEntityAdapter({
  selectId: (ticket: TicketModel) => ticket.id,
  sortComparer: (a: TicketModel, b: TicketModel) =>
    a.description.localeCompare(b.description, undefined, { numeric: true }),
});
export const initialState: State = adapter.getInitialState();

export function reducer(
  state: State = initialState,
  action: TicketsPageActions.Union | TicketsApiActions.Union,
): State {
  switch (action.type) {
    case TicketsApiActions.Types.LoadUsersAndTicketsSuccess: {
      return adapter.addAll(action.tickets, state);
    }

    case TicketsPageActions.Types.ToggleTicketComplete:
    case TicketsApiActions.Types.RetrySaveCompleteStatus: {
      return adapter.updateOne(
        {
          id: action.ticketId,
          changes: { completed: action.isComplete },
        },
        state,
      );
    }

    case TicketsApiActions.Types.SaveCompleteStatusFailure: {
      return adapter.updateOne(
        {
          id: action.ticketId,
          changes: { completed: !action.isComplete },
        },
        state,
      );
    }

    default: {
      return state;
    }
  }
}

export const { selectAll } = adapter.getSelectors();
