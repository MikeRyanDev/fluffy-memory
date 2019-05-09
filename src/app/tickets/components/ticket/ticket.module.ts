import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatCheckboxModule } from '@angular/material';
import { TicketComponent, FirstCharPipe } from './ticket.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatCardModule, MatCheckboxModule],
  declarations: [FirstCharPipe, TicketComponent],
  exports: [TicketComponent],
})
export class TicketComponentModule {}
