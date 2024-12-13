import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { NotificationService } from '../../../core/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class TaskModalComponent {
  @Output() taskCreated = new EventEmitter<void>(); // Evento para notificar la creación de una tarea
  newTask = { title: '', description: '', dueDate: '', status: 'Pendiente' }; // Modelo de nueva tarea
  isVisible = false; // Controla la visibilidad del modal

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  createTask(): void {
    this.taskService.createTask(this.newTask).subscribe({
      next: () => {
        this.notificationService.success('Tarea creada con éxito');
        this.taskCreated.emit(); // Notifica al componente padre
        this.closeModal(); // Cierra el modal
        this.newTask = {
          title: '',
          description: '',
          dueDate: '',
          status: 'Pendiente',
        }; // Resetea el formulario
      },
      error: () => {
        this.notificationService.error('Error al crear la tarea');
      },
    });
  }
}
