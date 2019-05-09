import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDetailsPageComponent } from './ticket-details-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TicketDetailsPageComponent],
  exports: [TicketDetailsPageComponent],
  entryComponents: [TicketDetailsPageComponent],
})
export class TicketDetailsPageComponentModule {}
