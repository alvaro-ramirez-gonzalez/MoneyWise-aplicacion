import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: false 
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    const amount = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(amount)) return '$0.00';
    
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  }
}