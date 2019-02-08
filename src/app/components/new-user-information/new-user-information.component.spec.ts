import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserInformationComponent } from './new-user-information.component';

describe('NewUserInformationComponent', () => {
  let component: NewUserInformationComponent;
  let fixture: ComponentFixture<NewUserInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
