import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsFormGroupComponent } from './is-form-group.component';

describe('IsFormGroupComponent', () => {
  let component: IsFormGroupComponent;
  let fixture: ComponentFixture<IsFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsFormGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
