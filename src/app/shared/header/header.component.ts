import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  username: string;
  private authService = inject(AuthService);
  private router = inject(Router); // Inyecta Router
  subscriptionAuthService: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscriptionAuthService = this.authService.username$.subscribe(username => {
      this.username = username;
    });
  }

  ngOnDestroy() {
    this.subscriptionAuthService?.unsubscribe();
  }

  logout(): void {
    this.authService.logout(); // Cierra sesión
    this.router.navigate(['']); // Redirige al login
  }
}
