import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryIcon',
  standalone: false
})
export class CategoryIconPipe implements PipeTransform {
  transform(category: string): string {
    const icons: { [key: string]: string } = {
      'Alimentación': 'restaurant-outline',
      'Transporte': 'bus-outline',
      'Vivienda': 'home-outline',
      'Ocio': 'game-controller-outline',
      'Salud': 'medkit-outline',
      'Ingreso': 'cash-outline',
      'Otros': 'ellipsis-horizontal-outline'
    };

    return icons[category] || 'help-circle-outline';
  }
}