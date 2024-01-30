import { RouterLink } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardsComponent } from '../cards/cards.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'task-home',
  standalone: true,
  imports: [CardsComponent, FooterComponent, MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent{
  greet = 'Good day!'
  notify = 'Drag and drop to move tasks across columns'
  @ViewChild(CardsComponent) cardsComponent!: CardsComponent

  ngOnInit() {
    this.updateGreetingAndTime() // Initial update
  }

  updateGreetingAndTime = () => {
    const now = new Date()
    const hourOfDay = now.getHours()
    hourOfDay < 12 ? this.greet = 'Good morning!' : hourOfDay < 18 ? this.greet = 'Good afternoon!' : this.greet = 'Good evening!'
  }
  setTask = (choice: string) => this.cardsComponent.setTask(choice)
}
