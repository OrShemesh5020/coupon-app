import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsViewComponent } from './coupons-view.component';

describe('CouponsViewComponent', () => {
  let component: CouponsViewComponent;
  let fixture: ComponentFixture<CouponsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
