import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardData } from '../../modals/card-data';
import { CardsDataService } from '../../services/cards-data.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-productinfo',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './productinfo.component.html',
  styleUrl: './productinfo.component.scss',
})
export class ProductinfoComponent implements OnInit, OnDestroy {
  productId: number = 0;
  data!: CardData;
  routeSub!: Subscription;
  productSub!: Subscription;

  constructor(
    private cardDataService: CardsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(
      (params) => (this.productId = params['id'])
    );
    this.productSub = this.cardDataService
      .getProductDetail(this.productId)
      .subscribe((data) => (this.data = data));
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.productSub.unsubscribe();
  }
}
