import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';
import { TicketListComponentModule } from '../ticket-list';
import { TicketsPageFiltersComponentModule } from '../tickets-page-filters';
import { TicketsPageComponent } from './tickets-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    TicketListComponentModule,
    TicketsPageFiltersComponentModule,
  ],
  declarations: [TicketsPageComponent],
  exports: [TicketsPageComponent],
  entryComponents: [TicketsPageComponent],
})
export class TicketsPageComponentModule {}
