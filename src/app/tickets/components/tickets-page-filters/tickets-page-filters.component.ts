import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../shared/state';
import { UserModel } from '../../../shared/models';
import { TicketsPageActions } from '../../actions';

@Component({
  selector: 'app-tickets-page-filters',
  template: `
    <mat-toolbar color="primary">
      <mat-form-field>
        <input
          matInput
          type="text"
          placeholder="Search Tickets"
          [value]="descriptionSearchTerm$ | async"
          (input)="onSearch($event.target.value)"
        />
      </mat-form-field>
      <app-user-filter
        [selectedUserId]="selectedUserId$ | async"
        [users]="users$ | async"
        (filter)="onFilterUser($event)"
      ></app-user-filter>
    </mat-toolbar>
  `,
  styles: [
    `
      mat-toolbar {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class TicketsPageFiltersComponent {
  selectedUserId$: Observable<number>;
  users$: Observable<UserModel[]>;
  descriptionSearchTerm$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedUserId$ = store.select(fromRoot.selectTicketUserIdFilter);
    this.users$ = store.select(fromRoot.selectAllUsers);
    this.descriptionSearchTerm$ = store.select(fromRoot.selectTicketDescriptionSearchTerm);
  }

  onFilterUser(userId: number) {
    this.store.dispatch(TicketsPageActions.createFilterByUserAction(userId));
  }

  onSearch(searchTerm: string) {
    this.store.dispatch(TicketsPageActions.createFilterByDescriptionAction(searchTerm));
  }
}
