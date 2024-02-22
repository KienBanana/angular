import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-product-container',
  standalone: true,
  imports: [RouterLink, RouterModule, NgFor],
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.css',
})
export class ProductContainerComponent {
  listProducts: any;
  constructor(private https: HttpClient) {
    // có observe là để lấy được dữ liệu trong json và header
    this.https.get('http://localhost:3000/products',{observe: 'response'}).subscribe(
      // subscribe là đợi dữ liệu về
      (res) => {
        console.log("ok=", res.ok);
        console.log("body=", res.body);
        console.log("res=", res);
        console.log("Content-Type=", res.headers.get('Content-Type'));
        this.listProducts= res.body; 
      }
    );
  }
}
