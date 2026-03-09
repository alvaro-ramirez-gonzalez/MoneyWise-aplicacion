  import { Component, OnInit } from '@angular/core';
  import { ModalController, AlertController } from '@ionic/angular';

  import { TransaccionService } from '../../core/services/transaccion.service';
  import { TransactionFormComponent } from '../../shared/components/transaction-form/transaction-form.component';
  import { Transaccion } from '../../core/models/transaccion.model';

  @Component({
    selector: 'app-transacciones',
    templateUrl: './transacciones.page.html',
    styleUrls: ['./transacciones.page.scss'], 
    standalone: false 
  })
  export class TransaccionesPage implements OnInit {
    
    transacciones: Transaccion[] = []; 
    transaccionesFiltradas: Transaccion[] = [];  
    filtroTipo: string = 'all'; 
    textoBuscar: string = ''; 

    constructor(
      private transaccionService: TransaccionService,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController
    ) {}

    ngOnInit() {
      
      this.transaccionService.transacciones$.subscribe((res: Transaccion[]) => {
        this.transacciones = res;
        this.filtrar(); 
      });
    }
    filtrar() {
      const texto = this.textoBuscar.toLowerCase().trim();

      this.transaccionesFiltradas = this.transacciones.filter(t => {
        
        const coincideTexto = 
          (t.description?.toLowerCase().includes(texto)) || 
          (t.category.toLowerCase().includes(texto));

        
        const coincideTipo = 
          this.filtroTipo === 'all' || 
          t.type === this.filtroTipo;

        return coincideTexto && coincideTipo;
      });
    }

    async agregarTransaccion() {
      const modal = await this.modalCtrl.create({
        component: TransactionFormComponent
      });
      await modal.present();

      const { data } = await modal.onWillDismiss();
      
      if (data) {
        this.transaccionService.agregarTransaccion(data);
      }
    }

    async eliminar(id: string) {
      const alert = await this.alertCtrl.create({
        header: 'Confirmar eliminación',
        message: '¿Estás seguro de que deseas borrar este movimiento?',
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          { 
            text: 'Eliminar', 
            role: 'destructive',
            handler: () => {
              if (id) this.transaccionService.eliminarTransaccion(id);
            } 
          }
        ]
      });
      await alert.present();
    }
  }