import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantcontactComponent } from './merchantcontact.component';

describe('MerchantcontactComponent', () => {
  let component: MerchantcontactComponent;
  let fixture: ComponentFixture<MerchantcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantcontactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
