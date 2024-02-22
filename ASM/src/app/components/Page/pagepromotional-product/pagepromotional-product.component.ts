import { Component } from '@angular/core';
import { IProducts } from '../../../iproducts';
import { DataService } from '../../../service/data.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../service/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagepromotional-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagepromotional-product.component.html',
  styleUrl: './pagepromotional-product.component.css',
})
export class PagepromotionalProductComponent {
  constructor(private data: DataService, private cartService: CartService) {}
  // khai báo cái listProducts này là để view sài view là mấy trang html
  listProducts: IProducts[] = [];
  ngOnInit(): void {
    // subescribe lấy kq từ getProducts xong đó truyền vào biến data  sau đó lại truyền listProducts
    this.data
      .getPromotionalProducts()
      .subscribe((data) => (this.listProducts = data));
    this.data.getPromotionalProducts().subscribe((data) => (this.listProducts = data));
  }
  // gọi từ cartService truyền đối số là product
  addToCart(product: IProducts){
    // này gọi tới trong service mà mình đã tạo trong contructor
    this.cartService.addToCart(product);
    // log hết các sp đang có trong cart
    console.log(this.cartService.getItems());
    alert("Đã thêm giỏ hàng")
  }
  
}
