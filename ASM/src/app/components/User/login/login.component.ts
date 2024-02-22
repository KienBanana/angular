import { Component } from '@angular/core';
import { LoginContainerComponent } from '../login-container/login-container.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginContainerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
