import { Component } from '@angular/core';
import { FilterService } from '../../../core/services/filter.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

interface EventStatusOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-sport-events-filter',
  standalone: true,
  templateUrl: './sport-events-filter.component.html',
  imports: [FormsModule,  NgSelectModule],
})
export class SportEventsFilterComponent {
  filterText = '';
  dateFilter: string = ''; 
  selectedStatuses: string[] = []; 

  statusOptions: EventStatusOption[] = [
    { id: 'NotStarted', name: 'No Iniciado' },
    { id: 'Live', name: 'En Vivo' },
    { id: 'Finished', name: 'Finalizado' },
  ];

  isCollapsed: boolean = false;

  constructor(private filterService: FilterService) {}

  toggleFilters(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onTeamFilterChange(): void {
    if (this.filterText.trim()) {
      this.filterService.updateFilter('team', this.filterText);
    } else {
      this.filterService.removeFilter('team');
    }
  }

  onDateFilterChange(): void {
    if (this.dateFilter) {
      const selectedDate = new Date(this.dateFilter);
      selectedDate.setHours(0, 0, 0, 0); 
      this.filterService.updateFilter('date', selectedDate);
    } else {
      this.filterService.removeFilter('date');
    }
  }

  onStatusFilterChange(): void {
    if (this.selectedStatuses.length > 0) {
      this.filterService.updateFilter('status', this.selectedStatuses);
    } else {
      this.filterService.removeFilter('status');
    }
  }

  clearAllFilters(): void {
    this.filterText = '';
    this.dateFilter = '';
    this.selectedStatuses = [];
    this.filterService.clearFilters();
  }
}
