import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IOrder } from '~/iorder';
import { OrderService } from '~/service/order.service';
import { AdminLeftComponent } from '../admin-left/admin-left.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history-admin',
  standalone: true,
  imports: [AdminLeftComponent, CommonModule, FormsModule],
  templateUrl: './history-admin.component.html',
  styleUrl: './history-admin.component.css',
})
export class HistoryAdminComponent {
  orderItems: IOrder[] = [];
  selectedStatus: string = '';
  selectedStatusList: string[] = [];

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
  calculateOrderTotal(order: IOrder): number {
    // Calculate the total price for all products in the order taking into account quantity
    return order.products.reduce(
      (total, product) => total + product.quantity * +product.price,
      0
    );
  }
  calculateTotalUniquePeople(orders: IOrder[]): number {
    // Assuming customer_email is the unique identifier
    const uniquePeople = new Set(orders.map((order) => order.customer_name));
    return uniquePeople.size;
  }
}
