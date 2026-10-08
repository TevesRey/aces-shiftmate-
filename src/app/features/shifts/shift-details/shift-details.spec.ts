import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShiftDetails } from './shift-details';

describe('ShiftDetails', () => {
  let component: ShiftDetails;
  let fixture: ComponentFixture<ShiftDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
