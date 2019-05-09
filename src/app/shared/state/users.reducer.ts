import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { TicketsApiActions } from '../../tickets/actions';
import { UserModel } from '../models';

export interface State extends EntityState<UserModel> {}
export const adapter = createEntityAdapter({
  selectId: (user: UserModel) => user.id,
  sortComparer: (a: UserModel, b: UserModel) => a.name.localeCompare(b.name),
});
export const initialState: State = adapter.getInitialState();

export function reducer(state: State = initialState, action: TicketsApiActions.Union): State {
  switch (action.type) {
    case TicketsApiActions.Types.LoadUsersAndTicketsSuccess: {
      return adapter.addAll(action.users, state);
    }

    default: {
      return state;
    }
  }
}

export const { selectAll, selectEntities } = adapter.getSelectors();
