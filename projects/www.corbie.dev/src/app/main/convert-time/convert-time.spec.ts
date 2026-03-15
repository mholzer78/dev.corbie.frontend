import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertTime } from './convert-time';

describe('ConvertTime', () => {
  let component: ConvertTime;
  let fixture: ComponentFixture<ConvertTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertTime],
    }).compileComponents();

    fixture = TestBed.createComponent(ConvertTime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
