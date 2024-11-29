import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CardsDataService } from '../../services/cards-data.service';
import { CardData } from '../../modals/card-data';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-productgrid',
  standalone: true,
  imports: [ProductCardComponent, NgFor],
  templateUrl: './productgrid.component.html',
  styleUrl: './productgrid.component.scss',
})
export class ProductgridComponent implements OnInit {
  cardsData: CardData[] = [];
  constructor(private dataService: CardsDataService) {}

  ngOnInit(): void {
    this.dataService
      .getAllProducts()
      .subscribe((data) => (this.cardsData = data));
  }
}
