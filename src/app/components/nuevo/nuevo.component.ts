import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from '../../services/sale.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Sale } from '../../models/sale';

@Component({
  selector: 'app-nuevo',
  standalone: false,
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent {
  addForm!: FormGroup;

  constructor(
    private saleService: SaleService,
    private snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.addForm = this.formBuilder.group({
      id: [""],
      nombreCliente: ["", Validators.required],
      dniCliente: ["", Validators.required],
      precioVenta: ["", [Validators.required, Validators.min(0)]],
      talla: ["", Validators.required],
      direccion: ["", Validators.required],
      fechaEnvio: [null, Validators.required], // Fecha tomada directamente del formulario
      nuevo: [null, Validators.required]
    });
  }

  registarVenta() {
    if (this.addForm.valid) {
      const sale: Sale = {
        id: 0,
        nombreCliente: this.addForm.get("nombreCliente")?.value,
        dniCliente: this.addForm.get("dniCliente")?.value,
        precioVenta: this.addForm.get("precioVenta")?.value,
        talla: this.addForm.get("talla")?.value,
        direccion: this.addForm.get("direccion")?.value,
        nuevo: this.addForm.get("nuevo")?.value,
        fechaEnvio: this.addForm.get("fechaEnvio")?.value // Fecha directa del formulario
      };

      console.log("Datos enviados:", sale);

      this.saleService.addSale(sale).subscribe({
        next: (data: Sale) => {
          this.snack.open("Venta registrada correctamente", "OK", { duration: 2000 });
          this.router.navigate(["/Listar"]);
        },
        error: (error) => {
          if (error.status === 409) {
            this.snack.open("Error: El DNI ya existe en la base de datos.", "OK", { duration: 3000 });
          } else {
            this.snack.open("Error al registrar la venta. Intente nuevamente.", "OK", { duration: 3000 });
          }
          console.error("Error en la solicitud:", error);
        }
      });
    } else {
      this.snack.open("Por favor, complete todos los campos requeridos", "OK", { duration: 2000 });
    }
  }
}
