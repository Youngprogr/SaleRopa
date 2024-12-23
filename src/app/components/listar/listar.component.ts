import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sale } from '../../models/sale';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';

import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-listar',
  standalone: false,
  
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  
    cant_venta:number=0;
  dsVentas=new MatTableDataSource<Sale>();
  displayedColumuns:string[]=['id','dniCliente','nombreCliente','precioVenta','talla','nuevo','fechaEnvio','direccion','opciones'];
 
 
  constructor (private  saleService:SaleService,private userService:UserService){}
  cargaVenta (){
    this.saleService.getSales().subscribe({
      next:(data:Sale[]) => {
        this.dsVentas = new MatTableDataSource(data);
        this.cant_venta = this.dsVentas.data.length;
      }
    })
  }
  formateaFecha(fecha:string){
    
    return fecha.slice(0,10);
  }
  
  eliminarVenta(id: number) {
    // Pregunta de confirmación
    if (confirm('¿Estás seguro de que deseas eliminar esta venta?')) {
      // Si el usuario confirma, procede a eliminar
      this.saleService.deleteSale(id).subscribe(
        () => {
          console.log('Venta eliminada');
          this.cargaVenta(); // Recargar los datos
        },
        (error) => {
          console.error('Error eliminando la venta', error);
        }
      );
    } else {
      console.log('Eliminación cancelada');
    }
  }
  editarVenta(){
    
  }

  
  ngOnInit(): void {
    this.cargaVenta();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsVentas.filter = filterValue.trim().toLowerCase();
  }
  isAdmin(): boolean {
    const authorities = this.userService.getAuthoritiesActual();
    return authorities ? authorities.includes('ROLE_ADMIN') : false;
  }
  
}
