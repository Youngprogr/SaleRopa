import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './modules/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AutorizacionInterceptor } from './interceptors/autorizacion.interceptor';
import { AutorizarLogeadoGuard } from './guards/autorizar-logueado.guard';
import { ListarComponent } from './components/listar/listar.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginFinalGodoymarcaComponent } from './components/login-final-godoymarca/login-final-godoymarca.component';
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';

import { LOCALE_ID } from '@angular/core';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
registerLocaleData(localeEsPe, 'es-PE');

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    NuevoComponent,
    MenuComponent,
    LoginFinalGodoymarcaComponent,
    RegistrarComponent,
    ListaUsuarioComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),

    {
      provide: HTTP_INTERCEPTORS, useClass: AutorizacionInterceptor, multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-PE' },
    AutorizarLogeadoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
registerLocaleData(localeEsPe, 'es-PE');

