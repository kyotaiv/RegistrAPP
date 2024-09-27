import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rest-cont',
  templateUrl: './rest-cont.component.html',
  styleUrls: ['./rest-cont.component.scss'],
})
export class RestContComponent  implements OnInit, OnDestroy {

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
