import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string>('');
  username$ = this.usernameSubject.asObservable();

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();

  webservice = inject(WebService);

  async buscarBD4(username: string, password: string) {
    const url = 'https://66f71bc3b5d85f31a34208c3.mockapi.io/user/v1/';
    const res = await this.webservice.request('GET', url, 'user') as Array<{
      username: string,
      password: string,
      typeUser: string,
      fullName: string,
      id: string
    }>;

    const user = res.find(u => u.username === username && u.password === password);

    if (user) {
      console.log('Autenticación exitosa!');
      this.isAuthenticatedSubject.next(true);
      this.usernameSubject.next(user.fullName);
      this.loginFailedSubject.next(false);
      return user;
    } else {
      this.isAuthenticatedSubject.next(false);
      this.loginFailedSubject.next(true);
      return null;
    }
  }

  logout(): void {
    this.usernameSubject.next('');
    this.isAuthenticatedSubject.next(false);
    this.loginFailedSubject.next(false);
  }

  isLoggedIn() {
    return this.isAuthenticated$;
  }



  async verificarUsuarioExistente(username: string, fullName: string) {
    const url = 'https://66f71bc3b5d85f31a34208c3.mockapi.io/user/v1/';
    const res = await this.webservice.request('GET', url, 'user') as Array<{
      username: string,
      password: string,
      typeUser: string,
      fullName: string,
      id: string
    }>;

    const usernameExists = res.some(user => user.username === username);
    const fullNameExists = res.some(user => user.fullName === fullName);

    return { usernameExists, fullNameExists };  // Retorna si ya existe el nombre de usuario o el nombre completo
  }

  // Método para registrar un nuevo usuario
  async registrarUsuario(newUser: { username: string, password: string, typeUser: string, fullName: string }) {
    const url = 'https://66f71bc3b5d85f31a34208c3.mockapi.io/user/v1/user';  // URL de la API para registrar usuarios
    try {
      const response = await this.webservice.request('POST', url, '', newUser);  // Enviar los datos del nuevo usuario a la API
      return response;  // Retornar la respuesta de la API si el registro fue exitoso
    } catch (error) {
      console.error('Error al registrar usuario:', error);  // Mostrar error en consola si la operación falla
      return null;  // Retornar null si hubo un error
    }
  }
}
