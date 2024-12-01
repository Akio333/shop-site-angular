import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { fromEvent, interval, Subscription, tap, throttle } from 'rxjs';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CardData } from '../../modals/card-data';
import { CardsDataService } from '../../services/cards-data.service';
import { CategoryComponent } from '../../components/category/category.component';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-productgrid',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgFor,
    NgIf,
    MatProgressSpinnerModule,
    CategoryComponent,
    CartComponent,
  ],
  templateUrl: './productgrid.component.html',
  styleUrl: './productgrid.component.scss',
})
export class ProductgridComponent implements OnInit, OnDestroy {
  allCardsData: CardData[] = [];
  currentCategory = 'all';
  currentCategoryData: CardData[] = [];
  cardsData: CardData[] = [];
  categories: string[] = [];
  isLoading = true;
  offset = 0;
  scrollSub!: Subscription;

  constructor(private dataService: CardsDataService) {}

  ngOnInit(): void {
    this.dataService.getAllProducts().subscribe((resp) => {
      this.allCardsData = resp;
      this.currentCategoryData = resp;
      this.isLoading = false;
      this.getProductsDynamic();
    });

    this.dataService
      .getCategories()
      .subscribe((resp) => (this.categories = resp));

    this.scrollSub = fromEvent(document, 'scroll')
      .pipe(
        throttle(() => interval(50)),
        tap(() => {
          const isBottom =
            window.innerHeight + window.scrollY >=
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
    if (!this.currentCategoryData[this.offset]) {
      this.scrollSub?.unsubscribe();
    }
    this.cardsData = [
      ...this.cardsData,
      ...this.currentCategoryData.slice(
        this.offset * 7,
        (this.offset + 1) * 7 - 1
      ),
    ];
    if (this.currentCategory !== 'all') {
      this.cardsData = this.cardsData.filter(
        (cardData) => cardData.category === this.currentCategory
      );
    }
    this.offset++;
  }

  handleCategoryChange(value: string) {
    this.currentCategory = value;
    if (this.currentCategory !== 'all') {
      this.currentCategoryData = this.allCardsData.filter(
        (cardData) => cardData.category === this.currentCategory
      );
    } else {
      this.currentCategoryData = this.allCardsData;
    }
    this.offset = 0;
    this.getProductsDynamic();
  }
}
