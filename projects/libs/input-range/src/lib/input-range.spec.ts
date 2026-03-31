import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRange } from './input-range';

describe('InputRange', () => {
  let component: InputRange;
  let fixture: ComponentFixture<InputRange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRange]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRange);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
