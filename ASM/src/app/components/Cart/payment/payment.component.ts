import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ICart } from '~/icart';
import { AuthService } from '~/service/auth.service';

import { CartService } from '~/service/cart.service';
import { OrderService } from '~/service/order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  orderForm: FormGroup;
  cartItems: ICart[] = [];
  user: any = null;
  customerInfo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  } = { name: '', address: '', email: '', phone: '' };
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.cartItems = this.cartService.getItems();
    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
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
    return 10000;
  }
  ngOnInit() {
    this.user = this.authService.getUserInfo();
    console.log('check user', this.user);

    if (this.user == null) {
      this.authService.user$.pipe().subscribe((data) => {
        console.log(1123123);

        this.user = data;
        console.log('check user1', this.user);
        // Gán email vào customerInfo nếu người dùng đã đăng nhập
        if (this.user !== null) {
          this.customerInfo.email = this.user.email;
        }
      });
    } else {
      // Gán email vào customerInfo nếu người dùng đã đăng nhập
      this.customerInfo.email = this.user.email;
      console.log('check user in else', this.user);
    }
  }
  deleteAllItems() {
    this.cartService.clearCart(); // Sử dụng phương thức để xóa toàn bộ sản phẩm trong giỏ hàng
    this.cartItems = []; // Sau khi xóa, cập nhật mảng sản phẩm thành rỗng
  }
  placeOrder() {
    const vietnamDateOptions : Intl.DateTimeFormatOptions={
      timeZone: 'Asia/Ho_Chi_Minh', // Set the time zone to Vietnam
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const orderInfo = {
      customer_name: this.orderForm.value.name,
      customer_address: this.orderForm.value.address,
      customer_email: this.orderForm.value.email,
      customer_phone_number: this.orderForm.value.phone,
      createdAt: new Date().toLocaleString('en-US', vietnamDateOptions),
      products: this.items.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        brandName: item.brandName,
        image: item.image,
      })),
    };

    console.log('Sending order data:', orderInfo);

    this.orderService.placeOrder(orderInfo).subscribe(
      (response) => {
        console.log('Order placed successfully:', response);
        this.deleteAllItems();
        this.router.navigate(['/shop']);
      },
      (error) => {
        console.error('Error placing order:', error);
      }
    );
  }
}
