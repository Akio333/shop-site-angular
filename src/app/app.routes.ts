import { Routes } from '@angular/router';
import { ProductgridComponent } from './layouts/productgrid/productgrid.component';

export const routes: Routes = [
  {
    path: '**',
    component: ProductgridComponent,
  },
];
