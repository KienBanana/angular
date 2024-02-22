import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IOrder } from '~/iorder';
import { OrderService } from '~/service/order.service';

@Component({
  selector: 'app-history-user',
  standalone: true,

  imports: [CommonModule, FormsModule],
  templateUrl: './history-user.component.html',
  styleUrl: './history-user.component.css',
})
export class HistoryUserComponent {
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
    return order.products.reduce((total, product) => total + (product.quantity * +product.price), 0);
  }
}
