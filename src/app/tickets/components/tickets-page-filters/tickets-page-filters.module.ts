import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatInputModule } from '@angular/material';
import { UserFilterComponentModule } from '../user-filter';
import { TicketsPageFiltersComponent } from './tickets-page-filters.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatInputModule, UserFilterComponentModule],
  declarations: [TicketsPageFiltersComponent],
  exports: [TicketsPageFiltersComponent],
})
export class TicketsPageFiltersComponentModule {}
