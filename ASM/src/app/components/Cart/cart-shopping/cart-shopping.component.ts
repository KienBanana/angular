import { ChangeDetectorRef, Component } from '@angular/core';
import { CartContainerComponent } from '../cart-container/cart-container.component';
import { CartService } from '../../../service/cart.service';
@Component({
  selector: 'app-cart-shopping',
  standalone: true,
  imports: [CartContainerComponent],
  templateUrl: './cart-shopping.component.html',
  styleUrl: './cart-shopping.component.css'
})
export class CartShoppingComponent {

}
