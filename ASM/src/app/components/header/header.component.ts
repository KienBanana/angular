import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IProducts } from '../../iproducts';
import { DataService } from '../../service/data.service';
import { ICategory } from '../../icategory';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: any = null;
  check: any;
  searchProduct: string = '';
  searchResults: IProducts[] = [];
  searchTerm: string = '';
  showSearchResults: boolean = false;
  selectedCategory: string = '';
  uniqueCategories: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService
      .getCategoryName()
      .subscribe((categories: ICategory[]) => {});
    // kiem tra xac nhan tai khoan
    this.check = this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
    console.log(1);

    let inLogin = this.authService.isLoggedIn();
    console.log('2', inLogin);

    if (inLogin) {
      console.log(3);
      this.user = this.authService.getUserInfo();
      console.log('check this ueser', this.user);
      // chạy giá trị khởi tạo = null
    } else {
      console.log(4);
      this.user = null;
    }
    console.log(5);

    console.log(this.check);
  }
  // hàm tính số lượng
  items = this.cartService.getItems();
  totalQuantity() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // lọc sản phẩm
  searchProducts() {
    if (this.searchTerm.trim() !== '') {
      this.dataService.searchProducts(this.searchTerm).subscribe(
        (results: IProducts[]) => {
          this.searchResults = results;
          this.showSearchResults = true;
        },
        (error) => {
          console.error('Lỗi khi lấy kết quả tìm kiếm', error);
        }
      );
    } else {
      // Xóa kết quả tìm kiếm nếu từ khóa tìm kiếm trống
      this.searchResults = [];
      this.showSearchResults = false;
    }
  }
  search() {
    this.searchProducts();
  }

  navigateToProductDetail(productId: number) {
    this.router.navigate(['/product-detail', productId]);

    // Reset the search state
    this.resetSearch();
  }

  resetSearch() {
    // hàm này đưa tìm kiếm về ban đầu
    this.searchTerm = '';
    this.searchResults = [];
    // tắt ipnut tìm kiếm
    this.showSearchResults = false;
  }
  // ham dang xuat tai khoan
  logOut() {
    this.authService.logout();
    this.user = null;
    this.cd.detectChanges();
    this.router.navigate(['/home']);
  }
}
