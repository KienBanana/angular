import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-banner-shop',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './banner-shop.component.html',
  styleUrl: './banner-shop.component.css'
})
export class BannerShopComponent {

}
