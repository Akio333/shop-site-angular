import { Routes } from '@angular/router';
import { ProductgridComponent } from './layouts/productgrid/productgrid.component';
import { ProductinfoComponent } from './layouts/productinfo/productinfo.component';

export const routes: Routes = [
  { path: ':id', component: ProductinfoComponent },
  {
    path: '**',
    component: ProductgridComponent,
  },
];
