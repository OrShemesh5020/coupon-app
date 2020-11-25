import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyFormComponent } from './update-company-form.component';

describe('UpdateCompanyFormComponent', () => {
  let component: UpdateCompanyFormComponent;
  let fixture: ComponentFixture<UpdateCompanyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCompanyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
