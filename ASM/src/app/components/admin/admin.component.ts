import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { AdminLeftComponent } from './admin-left/admin-left.component';

import { ProductAdminComponent } from './product-admin/product-admin.component';
import { IOrder } from '~/iorder';
import { OrderService } from '~/service/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    AdminLeftComponent,
    ProductAdminComponent,CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  totalProduct: string = '';
  orderItems: IOrder[] = [];
  selectedStatus: string = '';
  selectedStatusList: string[] = [];
  totalOrders: number = 0; // Total number of orders
  totalUniquePeople: number = 0; // Total number of unique individuals (customers)
  totalRevenue: number = 0; // Total revenue from all products

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrderItems();
  }

  getOrderItems() {
    this.orderService.getOrderItems().subscribe((orderItems) => {
      this.orderItems = orderItems;
      // Initialize selectedStatusList with empty values for each row
      this.selectedStatusList = new Array(orderItems.length).fill('');
      console.log(orderItems);

      // Calculate and log the total number of orders, unique individuals, and total revenue
      this.totalOrders = orderItems.length;
      this.totalUniquePeople = this.calculateTotalUniquePeople(orderItems);
      this.totalRevenue = this.calculateTotalRevenue(orderItems);
      console.log('Total orders:', this.totalOrders);
      console.log('Total unique people:', this.totalUniquePeople);
      console.log('Total revenue:', this.totalRevenue);
    });
  }

  updateOrderStatus(orderId: string, newStatus: string, index: number): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(() => {
      // Cập nhật trạng thái đơn hàng thành công, làm điều gì đó (ví dụ: làm mới danh sách đơn hàng)
      this.getOrderItems();
      // Optionally, you can reset the selectedStatus for the updated row
      this.selectedStatusList[index] = '';
    });
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
  }
  // hàm số sản phẩm bán được
  calculateOrderTotal(order: IOrder): number {
    // Calculate the total quantity of all products in the order
    return order.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }
  get totalOrderQuantity(): number {
    return this.orderItems.reduce(
      (total, order) => total + this.calculateOrderTotal(order),
      0
    );
  }
  // hàm tính số ng mua hàng
  calculateTotalUniquePeople(orders: IOrder[]): number {
    // Assuming customer_name is the unique identifier
    const uniquePeople = new Set(orders.map((order) => order.customer_name));
    return uniquePeople.size;
  }
  // hàm tính tổng tiền
  calculateTotalRevenue(orders: IOrder[]): number {
    return orders.reduce((totalRevenue, order) => {
      return (
        totalRevenue +
        order.products.reduce((orderRevenue, product) => {
          return orderRevenue + product.quantity * +product.price;
        }, 0)
      );
    }, 0);
  }
}
