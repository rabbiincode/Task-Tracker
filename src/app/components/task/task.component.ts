import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [MatDatepickerModule]
})

export class TaskComponent{
  constructor(private formBuilder: FormBuilder){}
  loading = false
  greet = 'Good day!'
  currentTime!: string
  taskForm!: FormGroup
  @Input() choice!: string
  @Input() editTask!: Task
  @Output() toggle = new EventEmitter<boolean>()

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      dueDate: ['', [Validators.required, this.dateValidator]]
    })
    if (this.choice == 'edit'){
      this.taskForm.patchValue({title: this.editTask.title, desc: this.editTask.desc, dueDate: this.editTask.dueDate})
    }
  }

  // Getter for easy access to form controls
  get formControls() {
    return this.taskForm.controls
  }

  // Custom validator function to check if the date is less than the current date
  dateValidator = (control: AbstractControl) => {
    const inputValue = control.value
    if (inputValue && this.validateDate(inputValue)) {
      return { 'invalidDate': true }
    }
    return null
  }

  validateDate = (inputDate: string) => {
    const inputDateObject = new Date(inputDate) // Convert the input date string to a Date object
    const currentDate = new Date() // Get the current date
    return inputDateObject < currentDate
  }

  toggleTask = () => this.toggle.emit(false)
  select = () => this.choice == 'add' ? this.addTask() : this.editTask1()
  addTask = () => alert('Add')
  editTask1 = () => alert('Edit')
}
