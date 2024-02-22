import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable, catchError } from 'rxjs';
import { IOrder } from '~/iorder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderApi = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrderItems(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.orderApi);
  }

  // placeOrder(orderInfo: any): Observable<any> {
  //   const orderWithStatus = { ...orderInfo, status: 'Đang chờ xử lý' };
  //   return this.http.post<any>(this.orderApi, orderWithStatus);
  // }

  placeOrder(orderInfo: any): Observable<IOrder> {
    const orderWithStatusAndCreatedAt = {
      ...orderInfo,
      status: 'Đang chờ xử lý',
    
    };
    return this.http.post<IOrder>(this.orderApi, orderWithStatusAndCreatedAt)
    .pipe(
      catchError((error) => {
        console.error('Lỗi khi đặt hàng:', error);
      
        // Xử lý lỗi, có thể thông báo lỗi cho người dùng hoặc thực hiện các hành động cụ thể khác
        if (error.status === 400) {
          // Handle specific HTTP 400 error
          console.error('Bad Request:', error);
        } else {
          // Handle other errors
          console.error('Unknown Error:', error);
        }
      
        // Ném lại lỗi để truyền nó đến thành phần
        throw new Error('Custom error message');
      })
      
    );
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    const url = `${this.orderApi}/${orderId}`;
    return this.http.patch<any>(url, { status });
  }
  
}
