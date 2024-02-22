import { Injectable } from '@angular/core';
import { IProducts } from '../iproducts';
import { ICart } from '../icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private localStorageKey = 'cartItems';

  // Initialize items with the data from localStorage or an empty array
  items: ICart[] = JSON.parse(
    localStorage.getItem(this.localStorageKey) || '[]'
  );

  constructor() {}

  addToCart(product: IProducts) {
    let index = this.items.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      this.items[index].quantity++;
    } else {
      const cart: ICart = {
        id: product.id,
        productName: product.productName,
        price: product.price,
        image: product.image,
        quantity: 1,
        brandName: product.brandName,
      };
      this.items.push(cart);
    }

    // Save the updated cart to localStorage
    this.saveCartToLocalStorage();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    // Save the empty cart to localStorage
    this.saveCartToLocalStorage();
    return this.items;
  }
  private saveCartToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.items));
  }

  total() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  removeItem(item: ICart) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      // Save the updated cart to localStorage after removing an item
      this.saveCartToLocalStorage();
    }
  }
}
