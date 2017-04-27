import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { UserAuth } from './user-auth';


@Injectable()
export class OzgecmisSer {

  // url : string = 'https://servistakip.herokuapp.com/api/kayitlar/';
  url : string = 'http://127.0.0.1:8080/api/ozgecmis/';
  ozgecmisId: string;
  user: any

  constructor(public http: Http, public authService: UserAuth) {
    console.log('Hello OzgecmisSer Provider');
    this.ozgecmisId = "58eba2904be8d6e2c51b0757";
  }

  getOzgecmis(){

      let headers = new Headers();
      // headers.append('Authorization', this.authService.token);

      return new Promise((resolve, reject) => {
      this.http.get(this.url + this.ozgecmisId, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

}
}
