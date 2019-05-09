import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponentModule } from '../ticket/ticket.module';
import { TicketListComponent } from './ticket-list.component';

@NgModule({
  imports: [CommonModule, TicketComponentModule],
  declarations: [TicketListComponent],
  exports: [TicketListComponent],
})
export class TicketListComponentModule {}
