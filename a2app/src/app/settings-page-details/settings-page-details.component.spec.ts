import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageDetailsComponent } from './settings-page-details.component';

describe('SettingsPageDetailsComponent', () => {
  let component: SettingsPageDetailsComponent;
  let fixture: ComponentFixture<SettingsPageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
