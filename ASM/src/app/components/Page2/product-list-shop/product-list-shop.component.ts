import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { IProducts } from '../../../iproducts';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from '../../../service/cart.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryComponent } from '../category/category.component';
@Component({
  selector: 'app-product-list-shop',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    CategoryComponent,
  ],
  templateUrl: './product-list-shop.component.html',
  styleUrl: './product-list-shop.component.css',
})
export class ProductListShopComponent implements OnInit {
  listProducts: any;
  listFilteredProducts: any;
  constructor(
    private http: HttpClient,
    private data: DataService,
    private cartService: CartService
  ) {
    this.http
      .get(`http://localhost:3000/products`, { observe: 'response' })
      .subscribe((res) => {
        console.log('ok=', res.ok);
        console.log('body=', res.body);
        console.log('res=', res);
        console.log('Content-Type=', res.headers.get('Content-Type'));
        this.listProducts = res.body;
        this.listFilteredProducts = this.listProducts;
      });
  }
  listProductShop: IProducts[] = [];
  categoryName: string = '';
  categoryId: number = 0;
  // PageNum số sản phẩm muốn hiện thị trên 1 trang
  pageNum: number = 1;
  // pageSize là mỗi trang hiện bn sản phẩm
  pageSize: number = 6;
  // total này là để lưu số lượng người coi trang
  total: number = 0;
  ngOnInit(): void {
    // this.categoryId = Number(this.route.snapshot.params['id']);
    console.log(this.listProducts);

    this.data.getCategoryName(this.categoryId).subscribe(
      (category) => {
        if (category && category.length > 0) {
          this.categoryName = category[0].categoryName;
        } else {
          // Handle the case where category is undefined or empty
          console.log('Category not found or empty.');
        }
      },
      (error) => {
        // Handle the error from the getCategoryName request
        console.error('Error fetching category:', error);
      }
    );

    this.data
      .getProductCategory(this.categoryId, this.pageNum, this.pageSize)
      .subscribe(
        (res) => {
          this.listProductShop = res.body;
          this.total = Number(res.headers.get('X-Total-Count'));
        },
        (error) => {
          // Handle the error from the getProductCategory request
          console.error('Error fetching product category:', error);
        }
      );
  }

  pageMove(page: number) {
    this.pageNum = page;
    this.data
      .getProductCategory(this.categoryId, this.pageSize, this.pageNum)
      .subscribe((res) => {
        this.listProductShop = res.body;
        this.total = Number(res.headers.get('X-Total-Count'));
      });
  }
  // hầm add sản phẩm
  addToCart(product: IProducts) {
    this.cartService.addToCart(product);
    console.log(this.cartService.getItems());
    alert('Đã thêm vào giỏ hàng');
  }

  selectedCategory: number = 0;
  selectedPrice: number = 0;
  selectedBrand: string = '';
  applyFilters() {
    console.log(this.selectedPrice);

    this.listFilteredProducts = this.listProducts.filter((product: any) => {
      const matchCategory =
        !this.selectedCategory || this.selectedCategory == product.categoryId;
      const matchPrice =
        this.selectedPrice == 0 ||
        !this.selectedPrice ||
        Number(product.price) <= Number(this.selectedPrice);
      const matchBrand =
        !this.selectedBrand || product.brandName == this.selectedBrand;
      console.log(matchCategory, matchPrice, matchBrand);

      return matchCategory && matchPrice && matchBrand;
    });
  }
}
