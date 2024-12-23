import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-lista-usuario',
  standalone: false,
  
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent {
   users: User[] = []; // Lista de usuarios
  totalUsers: number = 0; // Contador de usuarios

  constructor(private userService: UserService) {
    this.loadUsers(); // Cargar lista de usuarios
    this.loadUserCount(); // Contar usuarios
  }

  // Cargar lista de usuarios
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  // Contar usuarios
  loadUserCount() {
    this.userService.getUserCount().subscribe({
      next: (count: number) => {
        this.totalUsers = count;
      },
      error: (err) => {
        console.error('Error al contar usuarios:', err);
      }
    });
  }

  // Eliminar usuario
  deleteUser(userId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers(); // Actualizar la lista de usuarios
          this.loadUserCount(); // Actualizar el contador de usuarios
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
        }
      });
    }
  }

}
