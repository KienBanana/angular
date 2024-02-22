import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  private isAuthenticated = false;

  // Khởi tạo BehaviorSubject với giá trị khởi đầu là null
  private userSubject = new BehaviorSubject<any>(null);

  // Để component khác có thể đăng ký và lắng nghe sự thay đổi

  user$ = this.userSubject.asObservable();
  async login(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    console.log(1);
    await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(2);

        // Nhận JWT token từ phản hồi và lưu vào localStorage
        const token = result.access_token;
        localStorage.setItem('access_token', token);

        // Có dữ liệu mới thông báo cho header thay đổi
        this.userSubject.next(this.getUserInfo());
        console.log(3);

        // Đánh dấu đã chứng thực thành công
        this.isAuthenticated = true;
        // Tiếp tục xử lý sau khi chứng thực thành công, ví dụ: chuyển hướng đến trang chính
        this.router.navigate(['/admin']);
      });
  }
  async signUp(formData: any) {
    const user = {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
    };

    let check = false;

    await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(22);
        check = true;
        console.log(result);
      })
      .catch((err) => {
        check = false;
      });
    console.log('check', check);

    return check;
  }
  logout() {
    // Xóa token khỏi localStorage
    localStorage.removeItem('access_token');
    // Có dữ liệu mới thông báo cho header thay đổi
    this.userSubject.next(null);
    // Đánh dấu đã đăng xuất
    this.isAuthenticated = false;
    // Tiếp tục xử lý sau khi đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
    this.router.navigate(['/login']);
  }

  getUserInfo(): any {
    let result: any = null;
    try {
      let token: any = localStorage.getItem('access_token');
      const decodedToken = this.jwtHelper.decodeToken(token);
      // Trả về thông tin người dùng từ token

      result = decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return result;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    let result: boolean = false;
    try {
      // Kiểm tra token có tồn tại, hợp lệ và chưa hết hạn
      result = !!token && !this.jwtHelper.isTokenExpired(token);
    } catch {}
    return result;
  }
  isAdmin(): boolean {
    const token = localStorage.getItem('access_token');
    let result: boolean = false;
    if (this.isLoggedIn() == false) {
      return result;
    }
    try {
      // Kiểm tra token có tồn tại, hợp lệ và chưa hết hạn
      let user = this.getUserInfo();
      if (user.role == '1') {
        result = true;
      }
    } catch {}
    return result;
  }
}
