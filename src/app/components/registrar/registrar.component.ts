import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-registrar',
  standalone: false,
  
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  registerForm!: FormGroup;
  ocultarPass: boolean = true;
  cantUsuarios: number = 0; // Contador de usuarios registrados


  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.registerForm = this.formBuilder.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  registrar() {
    const user: User = {
      id: 0,
      userName: this.registerForm.get("userName")?.value,
      password: this.registerForm.get("password")?.value,
      authorities: "ROLE_USER",
    };

    this.userService.newUser(user).subscribe({
      next: (data: User) => {
        this.cantUsuarios++;
        const snackBarRef = this.snack.open("Usuario registrado exitosamente", "OK", { duration: 5000 });
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(["/login"]); // Redirige al presionar "OK"
        });
      },
      error: (err) => {
        this.snack.open("Usuario no registrado", "OK", { duration: 2000 });
      },
    });
  }

}
