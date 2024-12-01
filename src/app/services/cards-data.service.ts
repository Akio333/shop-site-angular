import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardData } from '../modals/card-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardsDataService {
  url = 'https://fakestoreapi.com/products';

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<CardData[]> {
    return this.httpClient.get<CardData[]>(this.url);
  }

  getProductDetail(id: number): Observable<CardData> {
    return this.httpClient.get<CardData>(this.url + '/' + id);
  }

  getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url + '/categories');
  }
}
