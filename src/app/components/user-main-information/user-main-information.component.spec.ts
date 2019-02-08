import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainInformationComponent } from './user-main-information.component';

describe('UserMainInformationComponent', () => {
  let component: UserMainInformationComponent;
  let fixture: ComponentFixture<UserMainInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMainInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMainInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
