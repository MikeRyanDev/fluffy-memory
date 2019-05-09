import { TicketsPageActions, TicketsApiActions } from '../../tickets/actions';

export interface State {
  isLoading: boolean;
  didFailToLoad: boolean;
  descriptionSearchTerm: string;
  userIdFilter: number;
}

export const initialState: State = {
  isLoading: false,
  didFailToLoad: false,
  descriptionSearchTerm: '',
  userIdFilter: -1,
};

export function reducer(
  state: State = initialState,
  action: TicketsPageActions.Union | TicketsApiActions.Union,
): State {
  switch (action.type) {
    case TicketsPageActions.Types.Enter: {
      return {
        ...state,
        isLoading: true,
        didFailToLoad: false,
      };
    }

    case TicketsApiActions.Types.LoadUsersAndTicketsSuccess: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case TicketsApiActions.Types.LoadUsersAndTicketsFailure: {
      return {
        ...state,
        isLoading: false,
        didFailToLoad: true,
      };
    }

    case TicketsPageActions.Types.FilterByDescription: {
      return {
        ...state,
        descriptionSearchTerm: action.searchTerm,
      };
    }

    case TicketsPageActions.Types.FilterByUser: {
      return {
        ...state,
        userIdFilter: action.userId,
      };
    }

    default: {
      return state;
    }
  }
}

export const selectIsLoading = (state: State) => state.isLoading;
export const selectDidFailToLoad = (state: State) => state.didFailToLoad;
export const selectDescriptionSearchTerm = (state: State) => state.descriptionSearchTerm;
export const selectUserIdFilter = (state: State) => state.userIdFilter;
