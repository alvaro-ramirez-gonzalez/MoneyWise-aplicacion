import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: false 
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    
    const date = new Date(value);
    
    if (isNaN(date.getTime())) return value.toString();

    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  }
}