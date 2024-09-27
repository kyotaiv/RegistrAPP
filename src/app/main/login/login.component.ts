import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  typeUser: number;
  isLoading: boolean = false;
  loginFailed: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();

  constructor() { }

  ngOnInit(): void {
    this.authService.loginFailed$.subscribe(
      (loginFailed) => (this.loginFailed = loginFailed)
    );
  }

  async login(username: string, password: string): Promise<void> {
    this.isLoading = true;
    this.loginFailed = false;

    const user = await this.authService.buscarBD4(username, password);

    this.isLoading = false;

    if (user) {
      switch (user.typeUser) {
        case '2':  // Alumno
          this.username = '';
          this.password = '';
          this.router.navigate(['/alumno']);
          break;
        case '1':  // Admin
          this.username = '';
          this.password = '';
          this.router.navigate(['/admin']);
          break;
        case '3':  // Profesor
          this.username = '';
          this.password = '';
          this.router.navigate(['/profesor']);
          break;
        default:
          this.loginFailed = true;
      }
    } else {
      this.loginFailed = true;
    }
  }
}
