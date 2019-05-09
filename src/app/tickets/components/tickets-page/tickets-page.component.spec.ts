import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { TicketViewModel } from '../../../shared/models';
import { TicketsPageActions } from '../../actions';
import { TicketsPageComponent } from './tickets-page.component';

describe('Tickets Page Component', () => {
  const mockTicket: TicketViewModel = {
    id: 3,
    description: 'Another Test Ticket',
    completed: false,
    assigneeId: 111,
    assignee: {
      id: 111,
      name: 'Mock User',
    },
  };

  let mockStore: Store<any>;

  function compile({
    tickets = [],
    isLoading = false,
  }: {
    tickets?: TicketViewModel[];
    isLoading?: boolean;
  } = {}): ComponentFixture<TicketsPageComponent> {
    const fixture = TestBed.createComponent(TicketsPageComponent);

    fixture.componentInstance.tickets$ = of(tickets);
    fixture.componentInstance.isLoading$ = of(isLoading);

    fixture.detectChanges();

    return fixture;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TicketsPageComponent],
      providers: [provideMockStore({})],
      schemas: [NO_ERRORS_SCHEMA],
    });

    mockStore = TestBed.get(Store);

    spyOn(mockStore, 'dispatch');

    await TestBed.compileComponents();
  });

  it('should render correctly', () => {
    const fixture = compile();

    expect(fixture).toMatchSnapshot();
  });

  it('should show a progress bar if the page is loading', () => {
    const fixture = compile({ isLoading: true });

    expect(fixture).toMatchSnapshot();
  });

  it('should bind the list of tickets to the ticket list component', () => {
    const mockTickets = [mockTicket];
    const fixture = compile({ tickets: mockTickets });

    const { tickets } = fixture.debugElement.query(By.css('app-ticket-list')).properties;

    expect(tickets).toEqual(mockTickets);
  });

  it('should dispatch a "toggle ticket complete" action when a ticket in the list is toggled', () => {
    const mockTickets = [mockTicket];
    const fixture = compile({ tickets: mockTickets });
    const expectedAction = TicketsPageActions.createToggleTicketCompleteAction(
      mockTicket.id,
      !mockTicket.completed,
    );

    fixture.debugElement
      .query(By.css('app-ticket-list'))
      .triggerEventHandler('toggleComplete', mockTicket);

    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
