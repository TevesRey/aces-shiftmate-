import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpcomingShifts } from './upcoming-shifts';

describe('UpcomingShifts', () => {
  let component: UpcomingShifts;
  let fixture: ComponentFixture<UpcomingShifts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingShifts],
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingShifts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
