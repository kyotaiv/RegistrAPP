import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

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

  private authService = inject(AuthService);  // Inyección del servicio de autenticación
  private router = inject(Router);  // Inyección del servicio de enrutamiento

  constructor() { }

  ngOnInit(): void { }

  // Función que se ejecuta cuando el usuario intenta registrarse
  async register(): Promise<void> {
    // Reiniciar los estados de error y éxito
    this.passwordMismatch = false;
    this.registerFailed = false;
    this.userExists = false;
    this.fullNameExists = false;
    this.registerSuccess = false;

    // Verificar si las contraseñas ingresadas coinciden
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;  // Mostrar mensaje de error si no coinciden
      return;  // Detener la función si las contraseñas no coinciden
    }

    try {
      // Verificar si el nombre de usuario o el nombre completo ya existen
      const userExists = await this.authService.verificarUsuarioExistente(this.username, this.fullName);
      if (userExists.usernameExists) {
        this.userExists = true;  // Mostrar mensaje de error si el nombre de usuario ya existe
        return;
      }

      if (userExists.fullNameExists) {
        this.fullNameExists = true;  // Mostrar mensaje de error si el nombre completo ya existe
        return;
      }

      // Crear un objeto de usuario con la información proporcionada
      const newUser = {
        username: this.username,
        password: this.password,
        typeUser: '2',  // Tipo de usuario predeterminado, por ejemplo '2' para alumnos
        fullName: this.fullName
      };

      // Intentar registrar al nuevo usuario usando el servicio de autenticación
      const result = await this.authService.registrarUsuario(newUser);
      if (result) {
        this.registerSuccess = true;  // Mostrar mensaje de éxito
        // Limpiar los campos del formulario
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.fullName = '';
        this.router.navigate(['/']);
      } else {
        this.registerFailed = true;  // Mostrar mensaje de error si el registro falla
      }
    } catch (error) {
      this.registerFailed = true;  // Manejar errores durante el proceso de registro
    }
  }
}
