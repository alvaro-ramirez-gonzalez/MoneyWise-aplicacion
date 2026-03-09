import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryIcon',
  standalone: false
})
export class CategoryIconPipe implements PipeTransform {
  transform(category: string): string {
    if (!category) return 'help-circle-outline';

    const icons: { [key: string]: string } = {
      'alimentación': 'restaurant-outline',
      'transporte': 'bus-outline',
      'vivienda': 'home-outline',
      'ocio': 'game-controller-outline',
      'salud': 'medkit-outline',
      'salario': 'logo-usd', 
      'ingreso': 'cash-outline',
      'otros': 'ellipsis-horizontal-outline'
    };
    return icons[category.toLowerCase()] || 'help-circle-outline';
  }
}