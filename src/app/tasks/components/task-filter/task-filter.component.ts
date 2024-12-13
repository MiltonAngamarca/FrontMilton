import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../core/services/filter.service';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  imports: [FormsModule],
})
export class TaskFilterComponent {
  filterText = ''; // Valor inicial del filtro

  constructor(private filterService: FilterService) {}

  onFilterChange(): void {
    this.filterService.updateFilter(this.filterText); // Actualiza el filtro en el servicio
  }
}
