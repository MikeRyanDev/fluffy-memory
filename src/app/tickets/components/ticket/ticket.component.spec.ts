import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TicketViewModel } from '../../../shared/models';
import { TicketComponent, FirstCharPipe } from './ticket.component';

describe('Ticket Component', () => {
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

  let fixture: ComponentFixture<TicketComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TicketComponent, FirstCharPipe],
      schemas: [NO_ERRORS_SCHEMA],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(TicketComponent);
    fixture.componentInstance.ticket = mockTicket;
    fixture.detectChanges();
  });

  it('should render correctly', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should emit a "toggleComplete" output when the checkbox is toggled', () => {
    const nextCallback = jasmine.createSpy();

    const subscription = fixture.componentInstance.toggleComplete.subscribe(nextCallback);
    fixture.debugElement.query(By.css('mat-checkbox')).triggerEventHandler('change', {});

    expect(nextCallback).toHaveBeenCalled();

    subscription.unsubscribe();
  });

  it('should mark the checkbox as checked if the ticket is complete', () => {
    fixture.componentInstance.ticket = {
      ...mockTicket,
      completed: true,
    };
    fixture.detectChanges();
    const { checked } = fixture.debugElement.query(By.css('mat-checkbox')).properties;

    expect(checked).toBe(true);
  });
});
