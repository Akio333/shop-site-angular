import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule, MatBadgeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {}
