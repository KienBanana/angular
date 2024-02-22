import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { CartService } from '../../../service/cart.service';
import { IProducts } from '../../../iproducts';

@Component({
  selector: 'app-product-detail-single',
  standalone: true,
  imports: [],
  templateUrl: './product-detail-single.component.html',
  styleUrl: './product-detail-single.component.css',
})
export class ProductDetailSingleComponent {
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
   
  }
  product: any;
  ngOnInit(): void {
    var id = Number(this.route.snapshot.params['id']);
    console.log('check id deltai sig',id);
    // subscribe để đoán nhận kết quả của hàm get
    this.data.getProduct(id).subscribe((res) => {
      this.product = res;
      console.log(res);
    });
 
    
  } //ngOnInit
  addToCart(product: IProducts) {
    this.cartService.addToCart(product);
    console.log(this.cartService.getItems());
    alert('Đã thêm thành công vào giỏ hàng');
  }
}
