import { ComponentFixture, TestBed } from '@angular/core/testing';

import { colorconverterComponent } from './color-converter.component';

describe('colorconverterComponent', () => {
  let component: colorconverterComponent;
  let fixture: ComponentFixture<colorconverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [colorconverterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(colorconverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
