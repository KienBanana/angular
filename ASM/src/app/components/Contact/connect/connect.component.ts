import { Component } from '@angular/core';
import { ContactContainerComponent } from '../contact-container/contact-container.component';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [ContactContainerComponent],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {

}
