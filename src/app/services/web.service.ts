import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  httpClient = inject(HttpClient);

  constructor() { }

  request(type: 'POST' | 'GET', url: string, path: string, body: any = {}){
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if (type == 'POST') {
        this.httpClient.post(url + '/' + path, body, {headers}).subscribe( data => {
          resolve(data);
          return;
        });
      }

      if (type == 'GET') {
        this.httpClient.get(url + '/' + path, {headers}).subscribe( data => {
          resolve(data);
          return;
        });
      }
    });
  }

}
