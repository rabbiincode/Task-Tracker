import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'task-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent{
  constructor(private auth: AuthService, private router: Router){}
  isLogin = false
  @Output() toggle = new EventEmitter<boolean>()

  ngOnInit (){
    this.auth.isLogin$.subscribe((login) => {
      this.isLogin = login
    })
  }

  toggleSidebar = () => this.toggle.emit(true)
  navigate = (task: string) => {
    this.toggleSidebar()
    this.router.navigate(['tasks'], { queryParams: { query: task } })
  }
  authenticate = () => this.isLogin ? this.auth.logOut() : this.router.navigate(['/login'])
}
