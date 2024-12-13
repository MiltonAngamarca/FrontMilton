import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { FilterService } from '../../../core/services/filter.service';
import { NotificationService } from '../../../core/notification.service';
import { CommonModule } from '@angular/common';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule, TaskModalComponent],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = []; // Todas las tareas cargadas desde el backend
  filteredTasks: any[] = []; // Tareas filtradas que se mostrarán en la tabla
  @ViewChild(TaskModalComponent) taskModal!: TaskModalComponent; // Referencia al modal

  constructor(
    private taskService: TaskService,
    private filterService: FilterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTasks(); // Carga inicial de tareas
    this.subscribeToFilters(); // Suscribirse a cambios en el filtro
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks; // Mostrar todas las tareas inicialmente
        this.notificationService.success('Tareas cargadas correctamente');
      },
      error: () => {
        this.notificationService.error('Error al cargar las tareas');
      },
    });
  }

  private subscribeToFilters(): void {
    this.filterService.filter$.subscribe((filterText) => {
      this.filteredTasks = this.filterService.filterTasks(
        this.tasks,
        filterText
      );
    });
  }

  openTaskModal(): void {
    this.taskModal.openModal();
  }

  reloadTasks(): void {
    this.loadTasks(); // Recarga las tareas después de crear una nueva
  }
}
