import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import type { IonModal } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importar Router
import { Subscription } from 'rxjs';
import QRious from 'qrious';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-listaclases',
  templateUrl: './listaclases.component.html',
  styleUrls: ['./listaclases.component.scss'],
})
export class ListaclasesComponent implements OnInit, OnDestroy {
  username: string;
  subscriptionAuthService: Subscription;
  qrData: string = '';
  showQRCode: boolean =false;
  private authService = inject(AuthService); // Obtener el servicio de autenticación

//PROGRAMACION DE APLICACIONES MOVILES</h3> <p >Seccion: PGY4121-002D </p> <p >Sala: MP-PC230-LAB</p> <p >Hora: 13:01 a 14:20</p>
  asignatura = {nombre: 'Programacion de aplicaciones moviles',seccion: 'PGY4121-002D',sala: 'MP-PC230-LAB',hora: '13:01 A 14:20', id: '1'}
  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('modal', { static: true }) modal: IonModal;

  constructor(private animationCtrl: AnimationController, private router: Router) {} // Inyectar Router


  generarQR(asignaturaId:string){
    const fechaActual = new Date();
     const año = fechaActual.getFullYear();
     const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11, por eso sumamos 1
     const día = String(fechaActual.getDate()).padStart(2, '0');

     const fechaHora = `${año}-${mes}-${día}`;
     this.qrData=`http://localhost:8100/asistencia/${asignaturaId}/${this.username}/${fechaHora}`;
     this.showQRCode = true; // Muestra el código QR
      setTimeout(() => {
    this.createQR();
  }, 0);
  }
  createQR() {
    const qr = new QRious({
      element: this.qrCanvas.nativeElement,
      value: this.qrData,
      size: 256, // Tamaño del QR
      level: 'M' // Nivel de corrección de errores
    });
  }
  ngOnInit() {


    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('ion-backdrop'))
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('.modal-wrapper'))
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    this.modal.enterAnimation = enterAnimation;
    this.modal.leaveAnimation = leaveAnimation;

    this.subscriptionAuthService = this.authService.username$.subscribe(username => {
      this.username = username
      console.log('Docente:', username);
    });
  }

  closeModal() {
    this.modal.dismiss();
  }

  navigateBack() {
    this.router.navigate(['/profesor']);
  }

  ngOnDestroy() {
    this.subscriptionAuthService?.unsubscribe(); // Desuscribirse del observable del estado de autenticación
  }
}
