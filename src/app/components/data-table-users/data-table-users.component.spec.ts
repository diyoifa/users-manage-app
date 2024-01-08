import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableUsersComponent } from './data-table-users.component';

describe('DataTableUsersComponent', () => {
  let component: DataTableUsersComponent;
  let fixture: ComponentFixture<DataTableUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataTableUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
