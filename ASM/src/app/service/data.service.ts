import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducts } from '../iproducts';
import { ICategory } from '../icategory';
import { Observable, catchError } from 'rxjs';
import { ICart } from '../icart';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  private products: IProducts[] = [];
  constructor(private http: HttpClient) {
    this.http.get<IProducts[]>('http://localhost:3000/products').subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  getProduct(id: number): Observable<any> {
    console.log('check id', id);

    return this.http.get('http://localhost:3000/products/' + id);
  }
  getSellProduct() {
    var url =
      'http://localhost:3000/products?hot=1&_sort=views&_order=desc&_limit=6';
    return this.http.get<IProducts[]>(url);
  }

  getPromotionalProducts() {
    var url = `http://localhost:3000/products?categoryId=2&_sort=views&_order=desc&_limit=4`;
    return this.http.get<IProducts[]>(url);
  }
  getCategory() {
    var url = 'http://localhost:3000/categories';
    return this.http.get<ICategory[]>(url);
  }
  // phân trang
  getProductCategory(
    idCategory: Number = 0,
    pageSize: number = 1,
    pageNum: number = 1
  ) {
    var url = `http://localhost:3000/products?categoryId=${idCategory}&_sort=views&_order=desc`;
    url += `&_page=${pageNum}&_limit=${pageSize}`;
    return this.http.get<any>(url, { observe: 'response' });
  }
  getCategoryName(idCategory: Number = 0) {
    var url = `http://localhost:3000/categories?id=${idCategory}`;
    return this.http.get<ICategory[]>(url);
  }

  searchProducts(searchTerm: string): Observable<IProducts[]> {
    const url = `http://localhost:3000/products?q=${searchTerm}`;
    return this.http.get<IProducts[]>(url);
  }
  getFilteredProducts(category: number, price: number, brand: string) {
    let url = `http://localhost:3000/products?${
      category ? `categoryId=${category}&` : ''
    }${brand ? `brandName=${brand}&` : ''}${
      price ? `price=${price}&` : ''
    }_sort=views&_order=desc`;

    // Xóa ký tự & cuối cùng nếu có
    // url = url.endsWith('&') ? url.slice(0, -1) : url;

    console.log('url=', url);

    if (category) {
      url += `&category=${category}`;
    }

    if (price) {
      // Adjust this part based on your price filtering logic
      // For simplicity, assuming price is a string like '1000', '2000', etc.
      url += `&price=${price}`;
    }

    if (brand) {
      url += `&brandName=${brand}`;
    }

    return this.http.get<any>(url, { observe: 'response' }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return []; // Trả về một mảng rỗng hoặc giá trị mặc định khác
      })
    );
  }
  deleteProductById(id: number): Observable<any> {
    const deleteUrl = `http://localhost:3000/products/${id}`;
    return this.http.delete(deleteUrl);
  }

  addProduct(product: IProducts): Observable<any> {
    // Assuming your server supports POST requests to create a new product
    const addUrl = 'http://localhost:3000/products';
    return this.http.post(addUrl, product);
  }
  updateProduct(id: number, updatedProductData: any): Observable<any> {
    const updateUrl = `http://localhost:3000/products/${id}`;

    return this.http.put(updateUrl, updatedProductData).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        throw error;
      })
    );
  }
}
