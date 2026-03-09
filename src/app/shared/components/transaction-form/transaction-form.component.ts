import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaccion } from '../../../core/models/transaccion.model';   
import { CATEGORIAS } from '../../../core/constants/categorias.const';
import { CameraService } from '../../../core/services/camera.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  standalone: false
})
export class TransactionFormComponent implements OnInit {
  @Input() transaccion: any = { 
    type: 'expense',
    amount: null,
    date: new Date().toISOString(),
    category: '',
    description: '',
    image: ''
  };

  categorias = CATEGORIAS;
  isEditMode: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private cameraService: CameraService
  ) {}

  ngOnInit() {
    if (this.transaccion && this.transaccion.id) {
      this.isEditMode = true;
    }
  }

  async capturarFoto() {
    const foto = await this.cameraService.tomarFoto();
    if (foto) {
      this.transaccion.image = foto;
    }
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    this.modalCtrl.dismiss(this.transaccion);
  }
}