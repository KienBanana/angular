import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, RouterModule],
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css'],
})
export class LoginContainerComponent {
  constructor(private authService: AuthService, private router: Router) {}
  async onLogin(formData: any) {
    await this.authService.login(formData.email, formData.password);
    let checkAdmin = this.authService.isAdmin();
    if (checkAdmin) {
      console.log('admin');
      this.router.navigate(['/admin']);
    } else {
      console.log('user');
      this.router.navigate(['/home']);
    }
  }
  ngOnInit(): void {
    console.log('login:' + this.authService.isLoggedIn());
  }
}
