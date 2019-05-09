import { Injectable } from '@angular/core';
import { Observable, of, throwError, concat, timer } from 'rxjs';
import { delay, tap, ignoreElements } from 'rxjs/operators';
import { TicketModel, UserModel } from './shared/models';

function randomDelay() {
  return Math.random() * 4000;
}

@Injectable({ providedIn: 'root' })
export class BackendService {
  storedTickets: TicketModel[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false,
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 111,
      completed: false,
    },
    {
      id: 2,
      description: 'Feed the cats',
      assigneeId: 112,
      completed: true,
    },
  ];

  storedUsers: UserModel[] = [{ id: 111, name: 'Victor' }, { id: 112, name: 'Mike' }];

  lastId = 2;

  constructor() {}

  private findTicketById = (id: number) =>
    this.storedTickets.find(ticket => ticket.id === +id);
  private findUserById = (id: number) => this.storedUsers.find(user => user.id === +id);

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<TicketModel | undefined> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: { description: string }) {
    const newTicket: TicketModel = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: 111,
      completed: false,
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: TicketModel) => this.storedTickets.push(ticket)),
    );
  }

  assign(ticketId: number, userId: number) {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.findUserById(+userId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: TicketModel) => {
          ticket.assigneeId = +userId;
        }),
      );
    }

    return throwError(new Error('ticket or user not found'));
  }

  complete(ticketId: number, completed: boolean) {
    const foundTicket = this.findTicketById(+ticketId);
    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: TicketModel) => {
          ticket.completed = completed;
        }),
      );
    }

    return throwError(new Error('ticket not found'));
  }

  // complete(ticketId: number, completed: boolean) {
  //   return concat(timer(randomDelay()), throwError("Failed to save")).pipe(
  //     ignoreElements()
  //   );
  // }
}
