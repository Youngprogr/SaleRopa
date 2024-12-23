import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFinalGodoymarcaComponent } from './components/login-final-godoymarca/login-final-godoymarca.component';
import { ListarComponent } from './components/listar/listar.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { AutorizarLogeadoGuard } from './guards/autorizar-logueado.guard';
import { AutorizarEditorGuard } from './guards/autorizar-editor.guard';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';


const routes: Routes = [
  {path:"",component:LoginFinalGodoymarcaComponent},
  {path:"login",component:LoginFinalGodoymarcaComponent},
  {path:"registro",component:RegistrarComponent},
  {path:"Listar",component:ListarComponent,canActivate:[AutorizarLogeadoGuard]},
  {path:"Nuevo",component:NuevoComponent,canActivate:[AutorizarLogeadoGuard,AutorizarEditorGuard]},
  {path:"lista-usuario",component:ListaUsuarioComponent,canActivate:[AutorizarEditorGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
