import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransaccionService } from '../../core/services/transaccion.service';
import { Transaccion } from '../../core/models/transaccion.model';
import { TransactionFormComponent } from '../../shared/components/transaction-form/transaction-form.component';


import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  saldoTotal = 0;
  totalIngresos = 0;
  totalGastos = 0;
  gastosPorCategoria: any[] = [];
  transacciones: Transaccion[] = [];
  
  
  private chart: Chart | undefined;

  constructor(
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.transaccionService.transacciones$.subscribe(transacciones => {
      this.transacciones = transacciones;
      this.calcularTotales(transacciones);
      this.agruparGastosPorCategoria(transacciones);
      
      setTimeout(() => this.generarGrafica(), 100);
    });
  }

  async ionViewWillEnter() {
    await this.transaccionService.cargarTransacciones();
  }

  private calcularTotales(transacciones: Transaccion[]) {
    this.totalIngresos = transacciones
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    this.totalGastos = transacciones
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    this.saldoTotal = this.totalIngresos - this.totalGastos;
  }

  private agruparGastosPorCategoria(transacciones: Transaccion[]) {
    const gastos = transacciones.filter(t => t.type === 'expense');
    const divisor = this.totalGastos || 1; 

    const totales: { [key: string]: number } = {};
    gastos.forEach(g => {
      totales[g.category] = (totales[g.category] || 0) + g.amount;
    });

    this.gastosPorCategoria = Object.keys(totales).map(cat => ({
      nombre: cat,
      total: totales[cat],
      porcentaje: totales[cat] / divisor,
      color: this.obtenerColor(cat)
    }));
  }

  private obtenerColor(categoria: string): string {
    const mapaColores: { [key: string]: string } = {
      'Alimentación': '#ffc409', 
      'Transporte': '#3880ff',  
      'Vivienda': '#eb445a',     
      'Ocio': '#5260ff',        
      'Salud': '#2dd36f',        
      'Otros': '#92949c'   
    };
    return mapaColores[categoria] || '#92949c';
  }

  generarGrafica() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: this.gastosPorCategoria.map(g => g.nombre),
        datasets: [{
          data: this.gastosPorCategoria.map(g => g.total),
          backgroundColor: this.gastosPorCategoria.map(g => g.color),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  async abrirFormulario() {
    const modal = await this.modalCtrl.create({
      component: TransactionFormComponent
    });
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      await this.transaccionService.agregarTransaccion(data);
    }
  }
}