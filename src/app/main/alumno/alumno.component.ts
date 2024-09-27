import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
})
export class AlumnoComponent  implements OnInit, OnDestroy {

  username: string;
  private authService = inject(AuthService);

  subscriptionAuthService: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscriptionAuthService = this.authService.username$.subscribe(username => {
      this.username = username
    });
  }

  ngOnDestroy() {
    this.subscriptionAuthService?.unsubscribe();
  }

}
