import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../shared/state';
import { TicketViewModel } from '../../../shared/models';
import { TicketsPageActions } from '../../actions';

@Component({
  selector: 'app-tickets-page',
  template: `
    <app-tickets-page-filters></app-tickets-page-filters>
    <mat-progress-bar
      color="accent"
      mode="indeterminate"
      *ngIf="isLoading$ | async"
    ></mat-progress-bar>
    <app-ticket-list [tickets]="tickets$ | async" (toggleComplete)="onToggleComplete($event)">
    </app-ticket-list>
  `,
})
export class TicketsPageComponent implements OnInit {
  tickets$: Observable<TicketViewModel[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.tickets$ = store.select(fromRoot.selectFilteredTickets);
    this.isLoading$ = store.select(fromRoot.selectIsTicketsPageLoading);
  }

  ngOnInit() {
    this.store.dispatch(TicketsPageActions.createEnterAction());
  }

  onToggleComplete(ticket: TicketViewModel) {
    this.store.dispatch(
      TicketsPageActions.createToggleTicketCompleteAction(ticket.id, !ticket.completed),
    );
  }
}
