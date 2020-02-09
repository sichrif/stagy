import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLicenceComponent } from './edit-licence.component';

describe('EditLicenceComponent', () => {
  let component: EditLicenceComponent;
  let fixture: ComponentFixture<EditLicenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLicenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
