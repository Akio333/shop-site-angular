import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categories = new FormControl('');
  @Input() categoryList: string[] = [];
  @Output() categoryEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.categoryList = ['all', ...this.categoryList];
  }

  selectCategory(value: string) {
    this.categoryEvent.emit(value);
  }
}
