import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPanelNavComponent } from '../admin-panel-nav/admin-panel-nav.component';
import { AdminViewUserInformation } from './admin-view-user-information.component';
import { FormsModule }   from '@angular/forms';

describe('AdminViewUserInformation', () => {
  let component: AdminViewUserInformation;
  let fixture: ComponentFixture<AdminViewUserInformation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewUserInformation,AdminPanelNavComponent ],
       imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewUserInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
