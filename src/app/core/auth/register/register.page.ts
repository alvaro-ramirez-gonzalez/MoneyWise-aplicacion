import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false 
})
export class RegisterPage implements OnInit {
  
  newUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  
  formValido(): boolean {
    const { name, email, password, confirmPassword } = this.newUser;
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return (
      name.trim().length > 2 &&
      emailPattern.test(email) &&
      password.length >= 8 &&
      passwordPattern.test(password) &&
      password === confirmPassword
    );
  }

  async onRegister() {
    
    if (!this.formValido()) {
      await this.mostrarMensaje('Los datos no cumplen con los requisitos de seguridad.');
      return;
    }

    const loader = await this.loadingCtrl.create({
      message: 'Creando cuenta...',
      spinner: 'crescent'
    });
    await loader.present();

    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000));

      await loader.dismiss();
      await this.mostrarMensaje('¡Cuenta creada con éxito!', 'success');
 
      this.router.navigate(['/auth/login']); 

    } catch (error) {
      await loader.dismiss();
      await this.mostrarMensaje('Error al crear la cuenta. Intenta de nuevo.', 'danger');
    }
  }

  async mostrarMensaje(msj: string, color: string = 'warning') {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 2500,
      color: color,
      position: 'bottom',
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }
}