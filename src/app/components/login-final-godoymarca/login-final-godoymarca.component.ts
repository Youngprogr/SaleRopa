import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login-final-godoymarca',
  standalone: false,
  templateUrl: './login-final-godoymarca.component.html',
  styleUrl: './login-final-godoymarca.component.css'
})
export class LoginFinalGodoymarcaComponent {
  alForm!: FormGroup
  ocultarPass:boolean=true;

  constructor(private alFormBuilder: FormBuilder, private alRouter: Router, private alSnackbar: MatSnackBar,
    private alUserService: UserService){}

  ngOnInit(){
    this.cargarForm();
  }

  cargarForm(){
    this.alForm=this.alFormBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  PasswordVisibility(): void {
    this.ocultarPass = !this.ocultarPass;
  }

  IniciarSesion(){
    let username: string = this.alForm.get("username")?.value
    let password: string = this.alForm.get("password")?.value
    
    if (!username || !password) {
      this.alSnackbar.open("Ingresa tus credenciales en los campos", "OK", { duration: 2000 });
      return;
    }
    
    const user: User = {
      id:0,
      userName: this.alForm.get("username")?.value,
      password: this.alForm.get("password")?.value,
      authorities: ""
    }

    this.alUserService.login(user).subscribe({
      next: (data) =>{
        this.alSnackbar.open("Se inicio sesion", "OK",{duration:2000});
        this.alRouter.navigate(["/Listar"]);
      },
      error: (err) =>{
        console.log(err);
        console.log(user);
        this.alSnackbar.open("Hubo un error en la identificación del usuario", "OK",{duration:2000});
      }
    });
  }
}
