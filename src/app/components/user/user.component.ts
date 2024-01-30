import { Router, RouterLink } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { CardsComponent } from '../cards/cards.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'task-user',
  standalone: true,
  imports: [CardsComponent, FooterComponent, HeaderComponent, MatIconModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent{
  constructor(private auth: AuthService, private router: Router){}
  username!: string
  greet = 'Good day!'
  @ViewChild(CardsComponent) cardsComponent!: CardsComponent

  ngOnInit() {
    this.auth.isLogin$.subscribe((login) => {
      !login && this.router.navigate(['/login'])
    })
    this.username = this.auth.getUsername(this.auth.username)
    this.updateGreetingAndTime() // Initial update
  }

  updateGreetingAndTime = () => {
    const now = new Date()
    const hourOfDay = now.getHours()
    hourOfDay < 12 ? this.greet = 'Good morning!' : hourOfDay < 18 ? this.greet = 'Good afternoon!' : this.greet = 'Good evening!'
  }
  setTask = (choice: string) => this.cardsComponent.setTask(choice)
}
