import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { TicketsApiEffects } from './tickets-api.effects';
import { TicketsPageComponentModule } from './components/tickets-page';
import { TicketDetailsPageComponentModule } from './components/ticket-details-page';

@NgModule({
  imports: [EffectsModule.forFeature([TicketsApiEffects]), MatSnackBarModule],
  exports: [TicketsPageComponentModule, TicketDetailsPageComponentModule],
})
export class TicketsModule {}
