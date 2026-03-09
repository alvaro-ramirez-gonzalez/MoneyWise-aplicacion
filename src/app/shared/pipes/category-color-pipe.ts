import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIAS } from '../../core/constants/categorias.const';

@Pipe({
  name: 'categoryColor',
  standalone: false 
})
export class CategoryColorPipe implements PipeTransform {
  transform(catId: string): string {
    if (!catId) return 'medium';
    const cat = CATEGORIAS.find((c: any) => c.id === catId);
    return cat ? cat.color : 'medium';
  }
}