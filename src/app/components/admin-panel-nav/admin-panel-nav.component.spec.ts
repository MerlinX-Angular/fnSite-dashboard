import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelNavComponent } from './admin-panel-nav.component';

describe('AdminPanelNavComponent', () => {
  let component: AdminPanelNavComponent;
  let fixture: ComponentFixture<AdminPanelNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
