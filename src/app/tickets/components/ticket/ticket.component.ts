import { Component, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { TicketViewModel } from 'src/app/shared/models';

@Pipe({ name: 'appFirstChar' })
export class FirstCharPipe implements PipeTransform {
  transform(value: string) {
    return value[0].toUpperCase();
  }
}

@Component({
  selector: 'app-ticket',
  template: `
    <mat-card [class.completed]="ticket?.completed">
      <div class="avatar">{{ ticket?.assignee.name | appFirstChar }}</div>
      <a [routerLink]="['/ticket', ticket?.id]">{{ ticket?.description }}</a>

      <mat-checkbox [checked]="ticket?.completed" (change)="onToggleComplete()"></mat-checkbox>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      a {
        text-decoration: none;
        color: inherit;
        flex-grow: 1;
        margin-right: 12px;
      }

      mat-card {
        display: flex;
        align-items: center;
      }

      mat-checkbox {
        flex-grow: 0;
        flex-shrink: 0;
      }

      .avatar {
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        vertical-align: middle;
        background-color: #f8bbd0;
        border-radius: 24px;
        margin-right: 12px;
      }

      .completed {
        opacity: 0.7;
      }

      .completed a {
        text-decoration: line-through;
        font-style: italic;
        opacity: 0.7;
      }
    `,
  ],
})
export class TicketComponent {
  @Input() ticket: TicketViewModel | undefined;
  @Output() toggleComplete = new EventEmitter();

  onToggleComplete() {
    this.toggleComplete.emit();
  }
}
