import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateStatus',
  standalone: true, // Hacer que el pipe sea standalone
})
export class TranslateStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'NotStarted':
        return 'No Iniciado';
      case 'Live':
        return 'En Vivo';
      case 'Finished':
        return 'Finalizado';
      // Agrega más casos según los estados disponibles
      default:
        return value;
    }
  }
}
