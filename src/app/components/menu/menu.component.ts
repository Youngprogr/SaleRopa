import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-menu',
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  rol!: string;
  username! : string;
  constructor( private router: Router, private userService: UserService){}
  isAdmin(): boolean {
    const authorities = this.userService.getAuthoritiesActual();
    return authorities ? authorities.includes('ROLE_ADMIN') : false;
  }
  ngOnInit(){
    this.rol = localStorage.getItem("authorities") ?? "";
    this.userService.getUser().subscribe({
      next: (data: User) =>{
        this.username =data.userName;
      }
    })
  }

  CerrarSesion(){
    this.userService.logout();     
    this.router.navigate(["/login"]);
  }

}
