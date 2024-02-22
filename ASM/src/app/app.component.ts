import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgFor,
    HeaderComponent,
    CommonModule,
    RouterOutlet,
    RouterModule,
    FooterComponent,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
