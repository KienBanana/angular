import { Component } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { ICategory } from '../../../icategory';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  constructor(private data: DataService) {
  }
  listCategory: ICategory[] = [];
  ngOnInit(): any {
    this.data.getCategory().subscribe((data) => (this.listCategory = data));
  }
  
}
