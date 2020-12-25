import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAllocationComponent } from './product-allocation.component';

describe('ProductAllocationComponent', () => {
  let component: ProductAllocationComponent;
  let fixture: ComponentFixture<ProductAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
