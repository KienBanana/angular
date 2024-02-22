import { Component } from '@angular/core';
import { PageNavigationComponent } from '../page-navigation/page-navigation.component';
import { ProductDetailSingleComponent } from '../product-detail-single/product-detail-single.component';
import { ProductDescriptionComponent } from '../product-description/product-description.component';

import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { CartService } from '../../../service/cart.service';
import { IProducts } from '../../../iproducts';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [PageNavigationComponent, ProductDescriptionComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  product: any;
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log('check id', id);
    this.data.getProduct(id).subscribe((res) => {
      this.product = res;
      console.log(res);
    });
    // subscribe để đoán nhận kết quả của hàm get
    //   this.data.getProduct(id).subscribe({
    //     next: (v) => {
    //       console.log(v)
    //       return this.product = v
    //     },
    //     error: (e) => console.error(e),
    //     complete: () => console.info('complete')
    // });
  } //ngOnInit
  addToCart(product: IProducts) {
    this.cartService.addToCart(product);
    console.log(this.cartService.getItems());
    alert('Đã thêm thành công vào giỏ hàng');
  }
}
