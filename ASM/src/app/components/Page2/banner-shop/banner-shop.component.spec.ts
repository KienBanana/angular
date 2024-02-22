import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerShopComponent } from './banner-shop.component';

describe('BannerShopComponent', () => {
  let component: BannerShopComponent;
  let fixture: ComponentFixture<BannerShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
