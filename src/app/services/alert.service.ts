import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlert, FailAlert, SuccessAlert } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})

export class AlertService{
  constructor(private dialog: MatDialog, private taskService: TaskService){}
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.dialog.open(DeleteAlert, {
      width: 'fit-content',
      height: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration
    })
  }

  openSuccessDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.dialog.open(SuccessAlert, {
      width: 'fit-content',
      height: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration
    })
  }

  openFailDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.dialog.open(FailAlert, {
      width: 'fit-content',
      height: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration
    })
  }

  taskId!: string
  getTaskId = (taskId: string) => this.taskId = taskId

  deleteTask = () => {
    this.taskService.deleteTask(this.taskId).then(() => {
      this.openSuccessDialog('0ms', '0ms')
    }, () => {
      // Failed
      this.openFailDialog('0ms', '0ms')
    })
  }
}
