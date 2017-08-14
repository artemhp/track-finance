import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWalletComponent } from './info-wallet.component';

describe('InfoWalletComponent', () => {
  let component: InfoWalletComponent;
  let fixture: ComponentFixture<InfoWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
