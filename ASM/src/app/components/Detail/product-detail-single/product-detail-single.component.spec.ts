import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailSingleComponent } from './product-detail-single.component';

describe('ProductDetailSingleComponent', () => {
  let component: ProductDetailSingleComponent;
  let fixture: ComponentFixture<ProductDetailSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDetailSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
