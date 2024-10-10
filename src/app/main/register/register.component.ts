import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AlertController } from '@ionic/angular';  // Importa el servicio AlertController


@Component({
  selector: 'app-register',  // Nombre del componente que será usado en el HTML
  templateUrl: './register.component.html',  // Archivo HTML asociado
  styleUrls: ['./register.component.scss'],  // Archivo de estilos asociado
})
export class RegisterComponent implements OnInit {
  // Variables que representan los datos del formulario
  username: string = '';  // Almacena el nombre de usuario
  password: string = '';  // Almacena la contraseña
  confirmPassword: string = '';  // Almacena la confirmación de contraseña
  fullName: string = '';  // Almacena el nombre completo del usuario
  passwordMismatch: boolean = false;  // Verifica si las contraseñas coinciden
  registerFailed: boolean = false;  // Indica si el registro falló
  userExists: boolean = false;  // Indica si el nombre de usuario ya está registrado
  fullNameExists: boolean = false;  // Indica si el nombre completo ya está registrado
  registerSuccess: boolean = false;  // Indica si el registro fue exitoso
  errorMessage: string = ''; // Para mostrar mensajes de error (si el usuario ya existe)
  successMessage: string = ''; // Para mostrar mensaje de éxito
  private authService = inject(AuthService);  // Inyección del servicio de autenticación
  private router = inject(Router);  // Inyección del servicio de enrutamiento
  private alertController = inject(AlertController);  // Inyecta el AlertController
  registroFallido: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  // Función que se ejecuta cuando el usuario intenta registrarse
  async register(): Promise<void> {
    // Reiniciar los estados de error
    this.passwordMismatch = false;
    this.registerFailed = false;
    this.userExists = false;
    this.fullNameExists = false;
    this.registerSuccess = false;

    // Validar que todos los campos tengan texto
    if (!this.username || !this.password || !this.confirmPassword || !this.fullName) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      await this.mostrarAlerta('Error', this.errorMessage);
      return;
    }

    // Verificar si las contraseñas ingresadas coinciden
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      this.errorMessage = 'Las contraseñas no coinciden.';
      await this.mostrarAlerta('Error', this.errorMessage);
      return;
    }

    // Validar el formato de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,15}$/;
    if (!passwordRegex.test(this.password)) {
      this.errorMessage = 'La contraseña debe tener: 1 mayúscula, 1 minúscula, 1 número, 1 carácter especial, y debe tener entre 15 y 20 caracteres.';
      await this.mostrarAlerta('Error', this.errorMessage);
      return;
    }

    // Capitalizar la primera letra del nombre y apellido
    this.fullName = this.capitalizeFullName(this.fullName);

    try {
      // Verificar si el usuario ya existe
      const userExists = await this.authService.verificarUsuarioExistente(this.username, this.fullName);
      if (userExists.usernameExists) {
        this.userExists = true;
        this.errorMessage = 'Nombre de usuario ya existente.';
        await this.mostrarAlerta('Error', this.errorMessage);
        return;
      }

      if (userExists.fullNameExists) {
        this.fullNameExists = true;
        this.errorMessage = 'El nombre ya existe.';
        await this.mostrarAlerta('Error', this.errorMessage);
        return;
      }

      // Crear objeto de usuario
      const newUser = {
        username: this.username,
        password: this.password,
        typeUser: '2',
        fullName: this.fullName
      };

      // Registrar usuario
      const result = await this.authService.registrarUsuario(newUser);
      if (result) {
        this.registerSuccess = true;
        this.router.navigate(['/']);
      } else {
        this.registerFailed = true;
        this.errorMessage = 'Hubo un problema con el registro.';
        await this.mostrarAlerta('Error', this.errorMessage);
      }
    } catch (error) {
      this.registerFailed = true;
      this.errorMessage = 'Error al registrar el usuario.';
      await this.mostrarAlerta('Error', this.errorMessage);
    }
  }
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();  // Muestra la alerta
  }
  // Función para capitalizar la primera letra de cada palabra en el nombre completo
  capitalizeFullName(fullName: string): string {
    return fullName.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
