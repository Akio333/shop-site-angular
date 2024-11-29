import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-productgrid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './productgrid.component.html',
  styleUrl: './productgrid.component.scss',
})
export class ProductgridComponent {}
