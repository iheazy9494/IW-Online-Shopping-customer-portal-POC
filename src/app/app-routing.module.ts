import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/shop/home/home.component';
import { DemoComponent } from './components/demo/demo.component';
import { AuthGuard } from './components/account/auth.guard';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)

      },
      {
        path: 'blog',
        loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
      },

    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'my-account',
    loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule)

  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, config)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
