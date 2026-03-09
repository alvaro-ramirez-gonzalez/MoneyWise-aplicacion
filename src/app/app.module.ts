import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core-module';


import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage'; 

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./core/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./core/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tabs', 
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },   
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    RouterModule.forRoot(routes), 
    CoreModule,
   
    IonicStorageModule.forRoot({
      name: '__moneywise_db',
      driverOrder: [Drivers.LocalStorage, Drivers.IndexedDB]
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}