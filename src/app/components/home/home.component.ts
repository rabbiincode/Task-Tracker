import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskComponent, CommonModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent{
  add = false
  task = 'add'
  loading = false
  editTask!: Task
  showTask!: string
  greet = 'Good day!'
  currentTask!: Task

  ngOnInit() {
    this.updateGreetingAndTime() // Initial update
  }

  updateGreetingAndTime = () => {
    const now = new Date()
    const hourOfDay = now.getHours()
    hourOfDay < 12 ? this.greet = 'Good morning!' : hourOfDay < 18 ? this.greet = 'Good afternoon!' : this.greet = 'Good evening!'
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

  filterTasks = (status: string) => {
    return this.tasks.filter(task => status == task.status)
  }

  onDrag = (task: Task) => {
    this.currentTask = task
  }

  onDrop = (event: DragEvent, status: string) => {
    event.preventDefault() 
    this.currentTask.status = status
  }

  onDragOver = (event: DragEvent) => event.preventDefault() 

  tasks: Task[] = [
    {
      title: 'Task1',
      desc: 'Description',
      dueDate : new Date('2/16/2024'),
      status: 'inprogress',
      taskId: '1'
    },
    {
      title: 'Task2',
      desc: 'Description2',
      dueDate : new Date('3/16/2024'),
      status: 'opened',
      taskId: '2'
    },
    {
      title: 'Task3',
      desc: 'Description3',
      dueDate : new Date('4/16/2024'),
      status: 'opened',
      taskId: '3'
    },
    {
      title: 'Task4',
      desc: 'Description4',
      dueDate : new Date('5/16/2024'),
      status: 'opened',
      taskId: '4'
    },
    {
      title: 'Task5',
      desc: 'Description5',
      dueDate : new Date('6/16/2024'),
      status: 'inprogress',
      taskId: '5'
    },
    {
      title: 'Task6',
      desc: 'Description5',
      dueDate : new Date('7/16/2024'),
      status: 'opened',
      taskId: '6'
    },
    {
      title: 'Task7',
      desc: 'Description5',
      dueDate : new Date('8/16/2024'),
      status: 'completed',
      taskId: '7'
    }
  ]
}
