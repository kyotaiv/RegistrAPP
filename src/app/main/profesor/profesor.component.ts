import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
})
export class ProfesorComponent  implements OnInit, OnDestroy {

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
