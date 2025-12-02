import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrbHttp404 } from './crb-lib-http404';

describe('CrbHttp404', () => {
  let component: CrbHttp404;
  let fixture: ComponentFixture<CrbHttp404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrbHttp404]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrbHttp404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
