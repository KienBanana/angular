import { Component } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { BannerShopComponent } from '../banner-shop/banner-shop.component';
import { IProducts } from '../../../iproducts';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [
    BannerShopComponent,
    CommonModule,
    NgxPaginationModule,
    RouterModule,
  ],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
})
export class ProductCategoryComponent {
  listProducts: IProducts[] = [];
  categoryName: string = '';
  categoryId: number = 0;
  // PageNum số sản phẩm muốn hiện thị trên 1 trang
  pageNum: number = 3;
  // pageSize là mỗi trang hiện bn sản phẩm
  pageSize: number = 2;
  // total này là để lưu số lượng người coi trang
  total: number = 0;
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    console.log(0);
  }
  ngOnInit(): void {
    console.log(1);
    this.categoryId = Number(this.route.snapshot.params['id']);
    console.log(this.categoryId);

    this.data.getCategoryName(this.categoryId).subscribe((cateogry) => {
      this.categoryName = cateogry[0].categoryName;
    });

    this.data
      .getProductCategory(this.categoryId, this.pageNum, this.pageSize)
      .subscribe((res) => {
        this.listProducts = res.body;
        this.total = Number(res.headers.get('X-Total-Count'));
      });
  }
  getCallCategory(id: number) {
    this.data.getCategoryName().subscribe((cateogry) => {
      this.categoryName = cateogry[0].categoryName;
    });

    this.data
      .getProductCategory(this.categoryId, this.pageNum, this.pageSize)
      .subscribe((res) => {
        this.listProducts = res.body;
        this.total = Number(res.headers.get('X-Total-Count'));
      });
  }
  pageMove(page: number) {
    this.pageNum = page;
    this.data
      .getProductCategory(this.categoryId, this.pageSize, this.pageNum)
      .subscribe((res) => {
        this.listProducts = res.body;
        this.total = Number(res.headers.get('X-Total-Count'));
      });
  }
  // hàm sắp xếp
  sort(click: any) {
    if (click == 'asc') {
      this.listProducts.sort((a, b) => a.price - b.price);
    } else {
      this.listProducts.sort((a, b) => b.price - a.price);
    }
  }
  addToCart(product: IProducts) {
    this.cartService.addToCart(product);
    console.log(this.cartService.getItems());
    alert('Đã thêm vào giỏ hàng');
  }
}
