import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  
  userEmail: string = 'Cargando...';

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    const user = await this.authService.getCurrentUser();
    if (user && user.email) {
      this.userEmail = user.email;
    } else {
      this.userEmail = 'Invitado';
    }
  }

 
  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres salir?',
      buttons: [
        { 
          text: 'Cancelar', 
          role: 'cancel' 
        },
        {
          text: 'Salir',
          role: 'destructive', 
          handler: async () => {
            await this.authService.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}