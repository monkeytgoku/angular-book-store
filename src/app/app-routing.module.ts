import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { VerifyEmailComponent } from './core/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/store'
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
    canActivate: []
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: []
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
