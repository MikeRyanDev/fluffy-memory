import { Component, Input, Output, EventEmitter, TrackByFunction } from '@angular/core';
import { UserModel } from '../../../shared/models';

@Component({
  selector: 'app-user-filter',
  template: `
    <mat-select
      placeholder="Assignee"
      [value]="selectedUserId"
      (selectionChange)="onSelectUser($event.value)"
    >
      <mat-option [value]="-1">
        All Users
      </mat-option>
      <mat-option *ngFor="let user of users; trackBy: selectUserId" [value]="user.id">
        {{ user.name }}
      </mat-option>
    </mat-select>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 220px;
      }
    `,
  ],
})
export class UserFilterComponent {
  @Input() selectedUserId: number = -1;
  @Input() users: UserModel[] = [];
  @Output() filter = new EventEmitter<number>();

  selectUserId: TrackByFunction<UserModel> = (_, user) => user.id;

  onSelectUser(userId: number) {
    this.filter.emit(userId);
  }
}
