import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareWalletComponent } from './share-wallet.component';

describe('ShareWalletComponent', () => {
  let component: ShareWalletComponent;
  let fixture: ComponentFixture<ShareWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
