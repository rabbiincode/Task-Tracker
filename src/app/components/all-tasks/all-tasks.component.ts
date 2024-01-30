import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { TaskService } from '../../services/task.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'task-all-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})

export class AllTasksComponent{
  constructor(private taskService: TaskService, private utils: UtilitiesService){}
  loading = false
  allTasks!: Task[]
  @ViewChild(CardsComponent) cardsComponent!: CardsComponent

  ngOnInit() {
    this.loading = true
    // Subscribe to route change event and rerender component on route change
    this.taskService.getAllTasks().subscribe(data => {
      this.allTasks = data
      this.loading = false
    }, () => {
      // Failed
      this.allTasks = []
      this.loading = false
    })
  }
  formatDate = (date: Date) => this.utils.formatDate(date)
}
