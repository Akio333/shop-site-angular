import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CardsDataService } from '../../services/cards-data.service';
import { CardData } from '../../modals/card-data';
import { NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { fromEvent, interval, Subscription, tap, throttle } from 'rxjs';

@Component({
  selector: 'app-productgrid',
  standalone: true,
  imports: [ProductCardComponent, NgFor, NgIf, MatProgressSpinnerModule],
  templateUrl: './productgrid.component.html',
  styleUrl: './productgrid.component.scss',
})
export class ProductgridComponent implements OnInit, OnDestroy {
  allCardsData: CardData[] = [];
  cardsData: CardData[] = [];
  isLoading = true;
  offset = 0;
  scrollSub!: Subscription;

  constructor(private dataService: CardsDataService) {}

  ngOnInit(): void {
    this.dataService.getAllProducts().subscribe((resp) => {
      this.allCardsData = resp;
      this.isLoading = false;
      this.getProductsDynamic();
    });
    this.scrollSub = fromEvent(document, 'scroll')
      .pipe(
        throttle(() => interval(100)),
        tap(() => {
          let isBottom =
            window.innerHeight + Math.round(window.scrollY) >=
            document.body.offsetHeight - 50;
          if (isBottom) {
            this.getProductsDynamic();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
  }

  getProductsDynamic() {
    if (!this.allCardsData[this.offset]) {
      this.scrollSub?.unsubscribe();
    }
    this.cardsData = [
      ...this.cardsData,
      ...this.allCardsData.slice(this.offset * 7, (this.offset + 1) * 7 - 1),
    ];
    this.offset++;
  }
}
