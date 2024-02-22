import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { ContainerComponent } from '../container/container.component';
import { ProductContainerComponent } from '../product-container/product-container.component';
import { SellProductComponent } from '../sell-product/sell-product.component';
import { PagepromotionalProductComponent } from '../pagepromotional-product/pagepromotional-product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    ContainerComponent,
    ProductContainerComponent,
    SellProductComponent,
    PagepromotionalProductComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
