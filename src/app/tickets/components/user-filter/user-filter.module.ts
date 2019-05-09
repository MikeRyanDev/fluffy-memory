import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material';
import { UserFilterComponent } from './user-filter.component';

@NgModule({
  imports: [CommonModule, MatSelectModule],
  declarations: [UserFilterComponent],
  exports: [UserFilterComponent],
})
export class UserFilterComponentModule {}
