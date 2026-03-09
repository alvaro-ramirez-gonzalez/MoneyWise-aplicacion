import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ModalController, AlertController } from '@ionic/angular'; 
import { TransaccionService } from '../../core/services/transaccion.service';
import { Transaccion } from '../../core/models/transaccion.model';
import { TransactionFormComponent } from '../../shared/components/transaction-form/transaction-form.component'; 
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: false
})
export class DetallePage implements OnInit {
  transaccion?: Transaccion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transService: TransaccionService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.transService.transacciones$.subscribe(listado => {
        this.transaccion = listado.find(t => t.id === id);
      });
    }
  }

  async abrirEdicion() {
    const modal = await this.modalCtrl.create({
      component: TransactionFormComponent,
      componentProps: {
        transaccion: { ...this.transaccion } 
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      await this.transService.actualizarTransaccion(this.transaccion!.id!, data);
    }
  }

  async confirmarEliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este movimiento?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            if (this.transaccion?.id) {
              await this.transService.eliminarTransaccion(this.transaccion.id);
              this.router.navigate(['/tabs/transacciones']); // Volver a la lista
            }
          }
        }
      ]
    });

    await alert.present();
  }
}