import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Importamos Router para la navegación

@Component({
  selector: 'app-listaclasesalu',
  templateUrl: './listaclasesalu.component.html',
  styleUrls: ['./listaclasesalu.component.scss'],
})
export class ListaclasesaluComponent implements OnInit, OnDestroy {

  username: string;
  private authService = inject(AuthService);
  private router = inject(Router); // Inyectamos el Router

  subscriptionAuthService: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscriptionAuthService = this.authService.username$.subscribe(username => {
      this.username = username;
    });
  }

  navigateBack() {
    this.router.navigate(['/alumno']);
  }

  ngOnDestroy() {
    this.subscriptionAuthService?.unsubscribe();
  }

}
