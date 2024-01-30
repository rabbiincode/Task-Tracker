import { Router } from '@angular/router';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { AlertService } from '../../services/alert.service';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UtilitiesService } from '../../services/utilities.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'task-task',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [MatDatepickerModule]
})


export class TaskComponent{
  constructor(private alert: AlertService, private auth: AuthService, private formBuilder: FormBuilder, private router: Router, private taskService: TaskService, private utils: UtilitiesService){}
  loading = false
  editDate = true
  greet = 'Good day!'
  currentTime!: string
  taskForm!: FormGroup
  @Input() choice!: string
  @Input() editTask!: Task
  @Output() toggle = new EventEmitter<boolean>()

  ngOnInit() {
    this.auth.isLogin$.subscribe((login) => {
      !login && this.router.navigate(['/login'])
    })
    this.taskForm = this.formBuilder.group({
      desc: ['', [Validators.required]],
      title: ['', [Validators.required]],
      taskId: ['id', [Validators.required]],
      failed: ['false', [Validators.required]],
      status: ['opened', [Validators.required]],
      username: [this.auth.username, [Validators.required]],
      dueDate: ['', [Validators.required, this.dateValidator]],
    })
    if (this.choice == 'edit'){
      this.editDate = false
      this.taskForm.patchValue({title: this.editTask.title, desc: this.editTask.desc, dueDate: new Date(this.convertDateToString(this.editTask.dueDate)),
        status: this.editTask.status, taskId: this.editTask.taskId, username: this.editTask.username, failed: this.editTask.failed
      })
    }
  }

  // Getter for easy access to form controls
  get formControls() {
    return this.taskForm.controls
  }

  // Custom validator function to check if the date is less than the current date
  dateValidator = (control: AbstractControl) => {
    const inputValue = control.value
    if (inputValue && this.validateDate(inputValue)){
      return { 'invalidDate': true }
    }
    return null
  }

  validateDate = (inputDate: string) => {
    const inputDateObject = new Date(inputDate) // Convert the input date string to a Date object
    const currentDate = new Date() // Get the current date
    return inputDateObject < currentDate
  }

  convertDateToString = (date: Date) => {
    const originalDate = new Date(date)
    const formattedString = `${originalDate.getMonth() + 1}/${originalDate.getDate()}/${originalDate.getFullYear()}`
    return formattedString
  }

  convertToDate = (dateString: string) => {
    const [month, day, year] = dateString.split('/');
    const convertedDate = new Date(`${month}/${day}/${year} 00:00:00`)
    return convertedDate
  }

  toggleTask = () => this.toggle.emit(false)
  select = () => this.choice == 'add' ? this.addTask() : this.editTask1()
  addTask = () => {
    this.taskService.createTask(this.taskForm.value).then(() => {
      this.toggleTask()
      this.success()
    }, () => {
      // Failed
      this.failed()
    })
  }

  editTask1 = () => {
    this.taskService.updateTask(this.taskForm.value.taskId, this.taskForm.value).then(() => {
      this.toggleTask()
      this.success()
    }, () => {
      // Failed
      this.failed()
    })
  }
  success = () => this.alert.openSuccessDialog('1', '1')
  failed = () => this.alert.openFailDialog('1', '1')
  formatDate = (date: Date) => this.utils.formatDate(date)
}
