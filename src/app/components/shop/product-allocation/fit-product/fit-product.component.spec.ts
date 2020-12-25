import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitProductComponent } from './fit-product.component';

describe('FitProductComponent', () => {
  let component: FitProductComponent;
  let fixture: ComponentFixture<FitProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
