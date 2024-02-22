import { Component } from '@angular/core';

import { HeaderComponent } from '../../header/header.component';
import { BannerShopComponent } from '../banner-shop/banner-shop.component';
import { ProductListShopComponent } from '../product-list-shop/product-list-shop.component';
import { PolycyShopComponent } from '../polycy-shop/polycy-shop.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [BannerShopComponent, ProductListShopComponent, PolycyShopComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}
