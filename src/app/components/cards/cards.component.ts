import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../services/task.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'task-cards',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})

export class CardsComponent{
  constructor(private alert: AlertService, private taskService: TaskService){}
  add = false
  task = 'add'
  tasks!: Task[]
  loading = false
  editTask!: Task
  showTask!: string
  currentTask!: Task

  ngOnInit (){
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data
    }, () => {
      // Failed
      this.tasks = []
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
}
