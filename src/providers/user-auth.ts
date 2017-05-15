import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
/*
  Generated class for the UserAuth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserAuth {

  token: any;
  // url : string = 'https://servistakip.herokuapp.com/api/auth/';
  url : string = 'http://127.0.0.1:8080/api/auth/';
  currentUser: any;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello UserAuth Provider');
  }

  checkAuthentication(){

    return new Promise((resolve, reject) => {
        this.storage.get('token').then((value) => {
            // console.log(value+' token');
            this.token = value;

        this.storage.get('user')
            .then((user) => this.currentUser = user);

            let headers = new Headers();
            headers.append('Authorization', this.token);
            this.http.get(this.url+'protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    });
  }

  createAccount(details){

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url+'register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            // this.currentUser = details;
            let data = res.json();
            // this.token = data.token;
            // this.storage.set('token', data.token);
            // this.storage.set('user', details);
            resolve(data);

          }, (err) => {
            // console.log(JSON.stringify(err)+'registererr')
            reject(err);
          });

    });
  }

  login(credentials){

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {

            let data = res.json();
            this.token = data.token;
            // console.log(data+'data');
            // console.log(JSON.stringify(data)+'jsondata');
            this.currentUser = data.user;
            this.storage.set('token', data.token);
            this.storage.set('user', data.user);

            resolve(data);
            // resolve(res.json());
          }, (err) => {
            // console.log(JSON.stringify(err)+'servis err')
            reject(err);
          });

    });
  }

  logout(){

      this.storage.remove('token');
      // this.storage.remove('user');
      this.currentUser = undefined;
      this.token = '';
  }

}
