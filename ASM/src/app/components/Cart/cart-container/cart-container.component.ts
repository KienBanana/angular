import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart-container',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart-container.component.html',
  styleUrl: './cart-container.component.css',
})
export class CartContainerComponent {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {
    this.cartItems = this.cartService.getItems();
  }
  items = this.cartService.getItems();
  total() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  totalQuantity() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
  totalShip() {
    if (this.items.length > 0) {
      return 10000;
    }
    return 0;
  }
  @Input() item: { quantity: number } = { quantity: 1 };
  // hàm tăng sản phẩm
  increaseQuantity(item: any) {
    item.quantity++;
    this.cdr.detectChanges();
  }
  // hàm giảm sản phẩm
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cdr.detectChanges();
    }
  }
  // hàm xóa sản phẩm
  removeItem(item: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.cdr.detectChanges(); // Update the view after removing the item
    }
  }
  saveCartToJson() {
    const cartJson = JSON.stringify(this.cartItems);
    // Bạn có thể thực hiện các hành động khác ở đây, ví dụ như lưu vào tệp, gửi lên server, v.v.
    console.log(cartJson);
  }
}
