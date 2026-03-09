import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  standalone: false
})
export class DashboardCardComponent {
  @Input() titulo: string = '';
  @Input() monto: number = 0;
  @Input() tipo: 'ingreso' | 'gasto' | 'saldo' = 'saldo';
  @Input() icono: string = 'cash-outline';

  constructor() {}
}