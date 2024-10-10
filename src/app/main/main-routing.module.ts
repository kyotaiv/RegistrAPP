import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RestContComponent } from './rest-cont/rest-cont.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { ListaclasesComponent } from './listaclases/listaclases.component';
import { ListaclasesaluComponent } from './listaclasesalu/listaclasesalu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';

const routes: Routes = [
  {path:'', component: LoginComponent },
  {path:'restcont', component: RestContComponent },
  {path:'alumno',component: AlumnoComponent},
  {path:'profesor',component: ProfesorComponent},
  {path:'listaclases',component: ListaclasesComponent},
  {path:'listaclasesalu', component: ListaclasesaluComponent},
  {path:'notfound',component:NotFoundComponent},
  {path:'registro',component:RegisterComponent},
  { path: 'asistencia/:codigo/:username/:fecha', component: AsistenciaComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
