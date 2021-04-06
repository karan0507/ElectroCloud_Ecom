import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProductsComponent } from './custom-products';

describe('CustomProductsComponent', () => {
  let component: CustomProductsComponent;
  let fixture: ComponentFixture<CustomProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
