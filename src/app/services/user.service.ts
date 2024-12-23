import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Token } from '../models/token';
import { tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ruta_servidor: string = "http://localhost:8080/final-autenticacion-Godoy";
  recurso:string = "users";

  constructor(private http:HttpClient) { }

  getUser(){
    return this.http.get<User>(this.ruta_servidor+"/"+this.recurso+"/"+localStorage.getItem("user_id"));
  }

  login(user: User){
    this.logout();
    return this.http.post<Token>(this.ruta_servidor+"/"+this.recurso +"/login",user).pipe(
      tap((resultado: Token) =>{
        localStorage.setItem("jwtToken", resultado.jwtToken);
        localStorage.setItem("user_id", resultado.userId.toString());
        localStorage.setItem("authorities", resultado.authorities);
      })
    );
  }

  logout(){
    localStorage.clear();
  }

  hayUsuarioLogueado(){
    if(this.getUserIdActual() == null || this.getUserIdActual() == ""){
      return false;
    }
    return true;
  }

  getTokenActual(){
    return localStorage.getItem("jwtToken");
  }

  getUserIdActual(){
    return localStorage.getItem("user_id");
  }

  getAuthoritiesActual(){
    return localStorage.getItem("authorities");
  }
  newUser(user: User) {
    return this.http.post<User>(`${this.ruta_servidor}/${this.recurso}/register`, user);
  }
  getUserCount() {
    let headers = new HttpHeaders();
    const token = this.getTokenActual();
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return this.http.get<number>(`${this.ruta_servidor}/${this.recurso}/count`, { headers: headers });
  }
  getUsers() {
    let headers = new HttpHeaders();
    const token = this.getTokenActual();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<User[]>(`${this.ruta_servidor}/${this.recurso}`, {
      headers: headers,
    });
  }

  // Eliminar usuario
  deleteUser(userId: number) {
    let headers = new HttpHeaders();
    const token = this.getTokenActual();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.delete<void>(
      `${this.ruta_servidor}/${this.recurso}/${userId}`,
      { headers: headers }
    );
  }
}
