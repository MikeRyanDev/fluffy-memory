import { Component, Input, Output, EventEmitter, TrackByFunction } from '@angular/core';
import { TicketViewModel } from '../../../shared/models';

@Component({
  selector: 'app-ticket-list',
  template: `
    <app-ticket
      *ngFor="let ticket of tickets; trackBy: selectTicketId"
      [ticket]="ticket"
      (toggleComplete)="onToggleComplete(ticket)"
    >
    </app-ticket>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 12px;
      }

      app-ticket:not(:last-of-type) {
        margin-bottom: 12px;
      }
    `,
  ],
})
export class TicketListComponent {
  @Input() tickets: TicketViewModel[] = [];
  @Output() toggleComplete = new EventEmitter<TicketViewModel>();

  selectTicketId: TrackByFunction<TicketViewModel> = (_, ticket) => ticket.id;

  onToggleComplete(ticket: TicketViewModel) {
    this.toggleComplete.emit(ticket);
  }
}
