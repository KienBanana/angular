import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminLeftComponent } from '../admin-left/admin-left.component';
import { IProducts } from '../../../iproducts';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../service/cart.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [
    CommonModule,
    AdminLeftComponent,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css',
})
export class ProductAdminComponent implements OnInit {
  productForm: FormGroup;
  editingProduct!: IProducts;
  listProducts: any;
  listFilteredProducts: any;
  constructor(
    private http: HttpClient,
    private data: DataService,

    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
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

    this.productForm = this.formBuilder.group({
      productName: '1', // Provide a default value here
      brandName: '',
      price: '',
      description: '',
      image: '',
      categoryId: '',
      views: '',
      hot: '',
      // Add other form controls as needed
    });
  }

  items = this.cartService.getItems();

  listProductShop: IProducts[] = [];
  post: IProducts[] = [];
  url = 'http://localhost:3000/products';
  categoryName: string = '';
  categoryId: number = 0;
  // PageNum số sản phẩm muốn hiện thị trên 1 trang
  pageNum: number = 1;
  // pageSize là mỗi trang hiện bn sản phẩm
  pageSize: number = 5;
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
          console.error('Category not found or empty.');
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
    // thêm sản phẩm
  }

  // pageMove(page: number) {
  //   this.pageNum = page;
  //   this.data
  //     .getProductCategory(this.categoryId, this.pageSize, this.pageNum)
  //     .subscribe((res) => {
  //       this.listProductShop = res.body;
  //       this.total = Number(res.headers.get('X-Total-Count'));
  //     });
  // }

  // hàm xóa sản phẩm
  removeProductById(productId: number) {
    const index = this.listFilteredProducts.findIndex(
      (item: any) => item.id === productId
    );
    if (index !== -1) {
      // Call the service to delete the product from the server
      this.data.deleteProductById(productId).subscribe(
        () => {
          // If the deletion is successful on the server, remove it from the local array
          this.listFilteredProducts.splice(index, 1);
          this.cdr.detectChanges(); // Update the view after removing the item
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
  // hàm thêm sản phẩm
  onSubmit() {
    const productData = this.productForm.value;

    if (this.editingProduct) {
      // Nếu có sản phẩm đang chỉnh sửa, thực hiện cập nhật
      this.data.updateProduct(this.editingProduct.id, productData).subscribe(
        (response) => {
          console.log('Product updated successfully:', response);
          // Handle success, e.g., redirect or show a success message
        },
        (error) => {
          console.error('Error updating product:', error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      // Nếu không có sản phẩm đang chỉnh sửa, thực hiện thêm mới
      this.data.addProduct(productData).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          // Handle success, e.g., redirect or show a success message
        },
        (error) => {
          console.error('Error adding product:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
  }
  // editProduct(productId: number) {
  //   // Tìm sản phẩm trong danh sách có id trùng khớp
  //   this.editingProduct = this.listFilteredProducts.find(product => product.id === productId);

  //   // Kiểm tra xem sản phẩm có tồn tại không trước khi gọi hàm thiết lập giá trị
  //   if (this.editingProduct) {
  //     this.setFormValues(); // Gọi hàm để thiết lập giá trị cho form
  //   } else {
  //     console.error(`Product with id ${productId} not found.`);
  //   }
  // }
  editProduct(productId: number) {
    console.log('Edit button clicked with ID:', productId);
  
    // Call your data service to get the product details by ID
    this.data.getProduct(productId).subscribe(
      (product) => {
        // Check if the product with the given ID exists
        if (product) {
          this.editingProduct = product; // Set the product as the one being edited
          this.setFormValues(); // Set the form values based on the editingProduct
        } else {
          console.error(`Product with id ${productId} not found.`);
        }
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  setFormValues() {
    this.productForm.setValue({
      productName: this.editingProduct.productName,
      brandName: this.editingProduct.brandName,
      price: this.editingProduct.price,
      description: this.editingProduct.description,
      image: this.editingProduct.image,
      categoryId: this.editingProduct.categoryId,
      views: this.editingProduct.views,
      hot: this.editingProduct.hot,
      // Set other form controls as needed
    });
  }
}
