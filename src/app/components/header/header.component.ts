import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'task-header',
  standalone: true,
  imports: [SidebarComponent, CommonModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent{
  constructor(private auth: AuthService, private router: Router){}
  isLogin = false
  showSidebar = false
  @Output() addTask = new EventEmitter<boolean>()

  ngOnInit (){
    this.auth.isLogin$.subscribe((login) => {
      this.isLogin = login
    })
  }

  setTask = () => this.addTask.emit(true)
  toggleSidebar = () => this.showSidebar = !this.showSidebar
  authenticate = () => this.isLogin ? this.auth.logOut() : this.router.navigate(['/login'])
}
