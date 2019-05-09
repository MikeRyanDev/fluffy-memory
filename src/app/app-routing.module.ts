import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsModule } from './tickets';
import { TicketsPageComponent } from './tickets/components/tickets-page';
import { TicketDetailsPageComponent } from './tickets/components/ticket-details-page';

const routes: Routes = [
  {
    path: '',
    component: TicketsPageComponent,
  },
  {
    path: 'ticket/:ticketId',
    component: TicketDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TicketsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
