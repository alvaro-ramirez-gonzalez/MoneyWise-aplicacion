import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from 'src/app/core/services/auth.service'; 
import { ToastController, IonicModule, AlertController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { App } from '@capacitor/app'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] 
})
export class LoginPage implements OnInit {
  
  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private platform: Platform
  ) {}

  ngOnInit() {
    // Detecta cuando el usuario usa el botón físico "atrás" del celular
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.salirApp();
    });
  }

  loginValido(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailOk = emailRegex.test(this.user.email);
    const passOk = this.user.password.length >= 8; 

    return emailOk && passOk;
  }

  async onLogin() {
    const success = await this.authService.login(this.user.email, this.user.password);

    if (success) {
      this.router.navigate(['/tabs'], { replaceUrl: true });
    } else {
      this.presentToast('Correo o contraseña incorrectos', 'danger');
    }
  }

  async salirApp() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Deseas cerrar la aplicación MoneyWise?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Salir', 
          handler: () => { App.exitApp(); } 
        }
      ]
    });
    await alert.present();
  }

  async presentToast(msj: string, color: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2500,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}