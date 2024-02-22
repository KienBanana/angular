import { Component } from '@angular/core';
import { AdminLeftComponent } from '../admin-left/admin-left.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '~/service/data.service';
import { ICategory } from '~/icategory';
import { CommonModule } from '@angular/common';
import { IProducts } from '~/iproducts';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from '~/service/cart.service';

@Component({
  selector: 'app-category-admin',
  standalone: true,
  imports: [AdminLeftComponent, RouterModule,CommonModule,NgxPaginationModule],
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.css',
})
export class CategoryAdminComponent {
  listProducts: IProducts[] = [];
  categoryName: string = '';
  categoryId: number = 0;
  // PageNum số sản phẩm muốn hiện thị trên 1 trang
  pageNum: number = 3;
  // pageSize là mỗi trang hiện bn sản phẩm
  pageSize: number = 2;
  // total này là để lưu số lượng người coi trang
  total: number = 0;
  constructor(  private data: DataService,
    private route: ActivatedRoute,
    private cartService: CartService) {}
  listCategory: ICategory[] = [];
  ngOnInit(): any {
    this.data.getCategory().subscribe((data) => (this.listCategory = data));

  }
  getCallCategoryId(id: number) {
    this.data.getCategory().subscribe((data) => (this.listCategory = data));
    console.log(1);

    // this.categoryId = Number(this.route.snapshot.params['id']);
    // console.log(this.categoryId);

    this.data.getCategoryName(id).subscribe((cateogry) => {
      this.categoryName = cateogry[0].categoryName;
    });
    this.data
      .getProductCategory(id, this.pageNum, this.pageSize)
      .subscribe((res) => {
        this.listProducts = res.body;
        this.total = Number(res.headers.get('X-Total-Count'));
      });
  }
}
