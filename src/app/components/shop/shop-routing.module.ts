import { ProductAllocationComponent } from './product-allocation/product-allocation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';

// Routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '', component: HomeComponent },
  // { path: 'two', component: HomeTwoComponent },
  // { path: 'three', component: HomeThreeComponent },
  // { path: 'four', component: HomeFourComponent },
  // { path: 'five', component: HomeFiveComponent },
  { path: 'products/:category', component: ProductLeftSidebarComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'product-allocation/:id', component: ProductAllocationComponent }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
