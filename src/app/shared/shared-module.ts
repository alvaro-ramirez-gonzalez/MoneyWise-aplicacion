import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CurrencyFormatPipe } from './pipes/currency-format-pipe';
import { DateFormatPipe } from './pipes/date-format-pipe';
import { CategoryIconPipe } from './pipes/category-icon-pipe';
import { CategoryColorPipe } from './pipes/category-color-pipe';

import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { ProgressBarCategoryComponent } from './components/progress-bar-category/progress-bar-category.component';

@NgModule({
  declarations: [
   
    CurrencyFormatPipe,
    DateFormatPipe,
    CategoryIconPipe,
    CategoryColorPipe,
   
    TransactionFormComponent,
    DashboardCardComponent,       
    ProgressBarCategoryComponent 
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,          
    ReactiveFormsModule    
  ],
  exports: [
    
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyFormatPipe,
    DateFormatPipe,
    CategoryIconPipe,
    CategoryColorPipe,
    TransactionFormComponent,
    DashboardCardComponent,       
    ProgressBarCategoryComponent 
  ]
})
export class SharedModule { }