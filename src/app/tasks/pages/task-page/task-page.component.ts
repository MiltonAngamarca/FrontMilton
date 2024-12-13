import { Component } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFilterComponent } from '../../components/task-filter/task-filter.component';


@Component({
  selector: 'app-task-page',
  standalone: true,
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  imports: [TaskListComponent, TaskFilterComponent],
})
export class TaskPageComponent {}
