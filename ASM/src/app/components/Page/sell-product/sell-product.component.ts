import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../service/data.service';
import { IProducts } from '../../../iproducts';
import { CartService } from '../../../service/cart.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './sell-product.component.html',
  styleUrl: './sell-product.component.css'
})
export class SellProductComponent {
  constructor(private data:DataService, private cartService: CartService) { }
  // khai báo cái listProducts này là để view sài view là mấy trang html
  listProducts:IProducts[] = [];
  ngOnInit(): void {
    // subescribe lấy kq từ getProducts xong đó truyền vào biến data  sau đó lại truyền listProducts 
    this.data.getSellProduct().subscribe(data => this.listProducts= data);

  }
  addToCart(product:IProducts){
    this.cartService.addToCart(product)
    console.log(this.cartService.getItems());
    alert("Đã thêm giỏ hàng")
  }
}
