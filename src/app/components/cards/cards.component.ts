import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'task-cards',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})

export class CardsComponent{
  constructor(private alert: AlertService, private auth: AuthService, private taskService: TaskService, private utils: UtilitiesService){}
  add = false
  task = 'add'
  tasks!: Task[]
  loading = false
  editTask!: Task
  showTask!: string
  currentTask!: Task
  notify = 'Drag and drop to move tasks across columns'

  ngOnInit (){
    this.loading = true
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data?.filter(task => this.auth.username == task.username)
      this.loading = false
    }, () => {
      // Failed
      this.tasks = []
      this.loading = false
    })
  }

  show = (taskId: string) => this.showTask == taskId ? this.showTask = '' : this.showTask = taskId
  setTask = (choice: string) => {
    this.task = choice
    this.toggleTask()
  }

  toggleTask = () => this.add = !this.add
  edit = (task: Task) => {
    this.editTask = task
    this.setTask('edit')
  }

  delete = (taskId: string) => {
    this.alert.getTaskId(taskId)
    this.alert.openDeleteDialog('0', '0')
  }

  filterTasks = (status: string) => {
    return this.tasks?.filter(task => status == task.status)
  }

  onDrag = (task: Task) => {
    this.currentTask = task
  }

  onDrop = (event: DragEvent, status: string) => {
    event.preventDefault()
    this.currentTask.status = status
    this.taskService.updateTask(this.currentTask.taskId, this.currentTask)
  }
  onDragOver = (event: DragEvent) => event.preventDefault()
  formatDate = (date: Date) => this.utils.formatDate(date)
}
