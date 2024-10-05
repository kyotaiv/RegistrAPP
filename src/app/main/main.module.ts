import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RestContComponent } from './rest-cont/rest-cont.component';
import { FormsModule } from '@angular/forms';
import { AlumnoComponent } from './alumno/alumno.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { ListaclasesComponent } from './listaclases/listaclases.component';
import { RouterLink } from '@angular/router';
import { ListaclasesaluComponent } from './listaclasesalu/listaclasesalu.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [HomeComponent,LoginComponent,RestContComponent,AlumnoComponent,ProfesorComponent,ListaclasesComponent, ListaclasesaluComponent, RegisterComponent],
  imports: [
    CommonModule,
    MainRoutingModule, SharedModule,IonicModule, FormsModule,RouterLink
  ]
})
export class MainModule { }
