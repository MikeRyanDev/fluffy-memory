import { ActionReducerMap, createSelector } from '@ngrx/store';
import { CustomRouterState } from '../../custom-route-serializer';
import * as fromTicketDetailsPage from './ticket-details-page.reducer';
import * as fromTicketsPage from './tickets-page.reducer';
import * as fromTickets from './tickets.reducer';
import * as fromUsers from './users.reducer';
import { TicketViewModel } from '../models';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface State {
  router: RouterReducerState<CustomRouterState>;
  ticketDetailsPage: fromTicketDetailsPage.State;
  ticketsPage: fromTicketsPage.State;
  tickets: fromTickets.State;
  users: fromUsers.State;
}

export const reducers: ActionReducerMap<State, any> = {
  router: routerReducer,
  ticketDetailsPage: fromTicketDetailsPage.reducer,
  ticketsPage: fromTicketsPage.reducer,
  tickets: fromTickets.reducer,
  users: fromUsers.reducer,
};

/**
 * Router State
 */
export const selectRouterState = (state: State) => state.router;
export const selectRouterParams = createSelector(
  selectRouterState,
  router => router.state.params,
);

/**
 * Ticket Details Page State
 */
export const selectTicketDetailsPageState = (state: State) => state.ticketDetailsPage;
export const selectIsTicketDetailsPageLoading = createSelector(
  selectTicketDetailsPageState,
  fromTicketDetailsPage.selectIsLoading,
);
export const selectDidTicketDetailsPageFailToLoad = createSelector(
  selectTicketDetailsPageState,
  fromTicketDetailsPage.selectDidFailToLoad,
);

/**
 * Tickets Page State
 */
export const selectTicketsPageState = (state: State) => state.ticketsPage;
export const selectIsTicketsPageLoading = createSelector(
  selectTicketsPageState,
  fromTicketsPage.selectIsLoading,
);
export const selectDidTicketsPageFailToLoad = createSelector(
  selectTicketsPageState,
  fromTicketsPage.selectDidFailToLoad,
);
export const selectTicketDescriptionSearchTerm = createSelector(
  selectTicketsPageState,
  fromTicketsPage.selectDescriptionSearchTerm,
);
export const selectTicketUserIdFilter = createSelector(
  selectTicketsPageState,
  fromTicketsPage.selectUserIdFilter,
);

/**
 * Tickets State
 */
export const selectTicketsState = (state: State) => state.tickets;
export const selectAllTickets = createSelector(
  selectTicketsState,
  fromTickets.selectAll,
);

/**
 * Users State
 */
export const selectUsersState = (state: State) => state.users;
export const selectAllUsers = createSelector(
  selectUsersState,
  fromUsers.selectAll,
);
export const selectUsersEntities = createSelector(
  selectUsersState,
  fromUsers.selectEntities,
);

/**
 * Custom Tickets Selectors
 */
export const selectTicketViews = createSelector(
  selectAllTickets,
  selectUsersEntities,
  (filteredTickets, usersEntities): TicketViewModel[] => {
    return filteredTickets.map(ticket => ({
      ...ticket,
      assignee: usersEntities[ticket.assigneeId],
    }));
  },
);

/**
 * Custom Ticket Details Page Selectors
 */
export const selectActiveTicket = createSelector(
  selectRouterParams,
  selectTicketViews,
  (routerParams, tickets) => {
    return tickets.find(ticket => ticket.id === parseInt(routerParams.ticketId, 10));
  },
);

/**
 * Custom Tickets Page Selectors
 */
export const selectFilteredTickets = createSelector(
  selectTicketViews,
  selectTicketDescriptionSearchTerm,
  selectTicketUserIdFilter,
  (tickets, descriptionSearchTerm, userIdFilter) => {
    return tickets.filter(ticket => {
      const descriptionMatches = ticket.description
        .toLowerCase()
        .includes(descriptionSearchTerm.toLowerCase());

      const userIdMatches = userIdFilter === -1 || ticket.assigneeId === userIdFilter;

      return descriptionMatches && userIdMatches;
    });
  },
);
