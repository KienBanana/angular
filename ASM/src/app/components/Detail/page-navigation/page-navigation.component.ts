import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-navigation',
  standalone: true,
  imports: [],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.css'
})
export class PageNavigationComponent implements OnInit {
  constructor(private data:DataService, private route:ActivatedRoute ){ }

  product:any;
  ngOnInit(): void {
    var id = Number(this.route.snapshot.params['id']);    
    // subscribe để đoán nhận kết quả của hàm get
    this.data.getProduct(id).subscribe((res) => 
      { console.log('check res', res);
         return this.product= res}
    )
  } //ngOnInit
}
