import { Component } from '@angular/core';

@Component({
  selector: 'task-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent{
  currentYear = new Date().getFullYear()
}
