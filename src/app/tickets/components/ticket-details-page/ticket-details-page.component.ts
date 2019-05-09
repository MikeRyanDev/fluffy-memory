import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TicketViewModel } from 'src/app/shared/models';
import * as fromRoot from 'src/app/shared/state';
import { TicketDetailsPageActions } from '../../actions';

@Component({
  selector: 'app-ticket-details-page',
  template: `
    <pre>{{ activeTicket$ | async | json }}</pre>
  `,
})
export class TicketDetailsPageComponent implements OnInit {
  activeTicket$: Observable<TicketViewModel | undefined>;

  constructor(private store: Store<fromRoot.State>) {
    this.activeTicket$ = store.select(fromRoot.selectActiveTicket);
  }

  ngOnInit() {
    this.store.dispatch(TicketDetailsPageActions.createEnterAction());
  }
}
