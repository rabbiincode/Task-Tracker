import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { MatDialogRef, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'task-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})

export class AlertComponent{
}

@Component({
  selector: 'blog-delete-alert',
  standalone: true,
  template: `
    <div class="delete-card">
      <p>Are you sure you want to delete this task?</p>
      <p>Action cannot be undone</p>
      <div class="delete-buttons">
        <button mat-dialog-close>Back</button>
        <button (click)="delete()">Delete</button>
      </div>
    </div>
  `,
  styleUrl: './alert.component.scss',
  imports: [MatDialogClose]
})
export class DeleteAlert{
  constructor(private alert: AlertService, public dialogRef: MatDialogRef<DeleteAlert>){}
  delete = () => {
    this.alert.deleteTask()
    this.dialogRef.close()
  }
}

@Component({
  selector: 'blog-success-alert',
  standalone: true,
  template: `
    <div class="success-card">
      <p>Action successful</p>
      <button mat-dialog-close>Close</button>
    </div>
  `,
  styleUrl: './alert.component.scss',
  imports: [MatDialogClose]
})
export class SuccessAlert{
  constructor(public dialogRef: MatDialogRef<SuccessAlert>){}
}

@Component({
  selector: 'blog-fail-alert',
  standalone: true,
  template: `
    <div class="success-card fail-card">
      <p>Could not complete Action</p>
      <p>Try again...</p>
      <button mat-dialog-close>Close</button>
    </div>
  `,
  styleUrl: './alert.component.scss',
  imports: [MatDialogClose]
})
export class FailAlert{
  constructor(public dialogRef: MatDialogRef<FailAlert>){}
}