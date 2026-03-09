import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaccion } from '../../../core/models/transaccion.model';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: false
})
export class TransactionItemComponent {
  
  @Input() transaccion!: Transaccion;
  
  @Output() clicked = new EventEmitter<Transaccion>();

  constructor() {}

  onItemClick() {
    this.clicked.emit(this.transaccion);
  }
}