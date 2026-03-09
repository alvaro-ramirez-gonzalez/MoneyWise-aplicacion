import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Añadido ReactiveFormsModule por si usas FormBuilder
import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { SharedModule } from '../../../shared/shared-module'; // Importante para Pipes y componentes comunes

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    SharedModule // <-- Agregado para que la página reconozca todo lo compartido
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}