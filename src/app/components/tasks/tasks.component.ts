import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AllTasksComponent } from '../all-tasks/all-tasks.component';

@Component({
  selector: 'task-tasks',
  standalone: true,
  imports: [AllTasksComponent, HeaderComponent, FooterComponent, TaskComponent, CommonModule, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})

export class TasksComponent{
  all = true
  add = false
  loading = false
  failedTask!: Task[]
  fetchFailed = false
  constructor(private activatedRoute: ActivatedRoute, private taskService: TaskService){}

  ngOnInit (){
    this.loading = true
    // Subscribe to route change event and rerender component on route change
    this.activatedRoute.queryParams.subscribe(params => {
      this.all = params['query'] == 'all'
    })
    this.taskService.getAllTasks().subscribe(data => {
      this.failedTask = data?.filter(task => task.status == 'failed')
      this.loading = false
    }, () => {
      // Failed
      this.failedTask = []
      this.loading = false
      this.fetchFailed = true
    })
  }
  addTask = () => this.add = !this.add
}
