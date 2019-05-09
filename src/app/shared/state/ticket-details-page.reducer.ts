import { TicketDetailsPageActions, TicketsApiActions } from 'src/app/tickets/actions';

export interface State {
  isLoading: boolean;
  didFailToLoad: boolean;
}

export const initialState: State = {
  isLoading: false,
  didFailToLoad: false,
};

export function reducer(
  state: State = initialState,
  action: TicketDetailsPageActions.Union | TicketsApiActions.Union,
): State {
  switch (action.type) {
    case TicketDetailsPageActions.Types.Enter: {
      return { ...state, isLoading: true, didFailToLoad: false };
    }

    case TicketsApiActions.Types.LoadUsersAndTicketsSuccess: {
      return { ...state, isLoading: false };
    }

    case TicketsApiActions.Types.LoadUsersAndTicketsFailure: {
      return { ...state, isLoading: false, didFailToLoad: true };
    }

    default: {
      return state;
    }
  }
}

export const selectIsLoading = (state: State) => state.isLoading;
export const selectDidFailToLoad = (state: State) => state.didFailToLoad;
