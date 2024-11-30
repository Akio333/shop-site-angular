import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CardsDataService } from '../../services/cards-data.service';
import { CardData } from '../../modals/card-data';
import { NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-productgrid',
  standalone: true,
  imports: [ProductCardComponent, NgFor, NgIf, MatProgressSpinnerModule],
  templateUrl: './productgrid.component.html',
  styleUrl: './productgrid.component.scss',
})
export class ProductgridComponent implements OnInit {
  cardsData: CardData[] = [];
  isLoading = true;
  constructor(private dataService: CardsDataService) {}

  ngOnInit(): void {
    this.dataService.getAllProducts().subscribe((resp) => {
      this.cardsData = resp;
      this.isLoading = false;
    });
  }
}
