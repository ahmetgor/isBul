import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {ToastController, LoadingController, Events } from 'ionic-angular';

/*
  Generated class for the UserAuth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserAuth {

  token: any;
  url : string = 'http://127.0.0.1:8080/api/auth/';
  url1: string = 'http://127.0.0.1:8080/api/tools/';
  url2: string = 'http://127.0.0.1:8080/api/ozgecmis/';
  // url : string = 'https://isgucvarisarayan.herokuapp.com/api/auth/';
  // url1: string = 'https://isgucvarisarayan.herokuapp.com/api/tools/';
  // url2: string = 'https://isgucvarisarayan.herokuapp.com/api/ozgecmis/'
  // url : string = window.location.origin+'/api/auth/';
  // url1: string = window.location.origin+'/api/tools/';
  currentUser: any;
  loading: any;
  ozgecmis: any;

  constructor(public http: Http, public storage: Storage,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController,
              public events: Events) {
    //console.log('Hello UserAuth Provider');
    //console.log(window.location.origin+'host');
    // this.storage.get('token').then((value) => {
    //     console.log(value+' token');
    //     this.token = value;
    //
    // this.storage.get('user')
    //     .then((user) => {this.currentUser = user;
    //     console.log(JSON.stringify(user)+' user');
    //
    //     this.storage.get('ozgecmis')
    //         .then((ozgecmis) => {
    //           this.ozgecmis = ozgecmis;
    //           console.log(JSON.stringify(ozgecmis)+' ozgecmis');
    //         });
    //       });
    //       });
    // this.checkAuthentication();
  }

  checkAuthentication(){

    return new Promise((resolve, reject) => {
        this.storage.get('token').then((value) => {
            // console.log(value+' token');
            this.token = value;

        this.storage.get('user')
            .then((user) => {
              this.currentUser = user;
              //console.log(JSON.stringify(this.currentUser)+"  checkauth currentuser");

            });

            this.storage.get('ozgecmis')
                .then((ozgecmis) => this.ozgecmis = ozgecmis)
                .catch((err) => {
                  //console.log("hata");
                });

            let headers = new Headers();
            headers.append('Authorization', this.token);
            this.http.get(this.url+'protected', {headers: headers})
                .subscribe(res => {
                  this.events.publish('ozgecmis:update');
                  //console.log(JSON.stringify(res)+"success");
                    resolve(res);
                }, (err) => {
                  //console.log(JSON.stringify(err)+"err");
                    reject(err);
                });
        });
    });
  }

  createAccount(details){

    return new Promise((resolve, reject) => {
      this.showLoader();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url+'register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            let data = res.json();
          //   this.currentUser = data.user;
          //   this.token = data.token;
          //   this.storage.set('token', data.token);
          //   this.storage.set('user', data.user);
          //
          //   this.getOzgecmis(data.user.ozgecmis)
          //   .then((ozgecmis) => {
          //     // this.ozgecmis = ozgecmis;
          //   // console.log(data+'data');
          // });
            this.loading.dismiss();
            resolve(data);

          }, (err) => {
            this.loading.dismiss();

            // console.log(JSON.stringify(err)+'registererr')
            reject(err);
          });
    });
  }

  login(credentials){

    return new Promise((resolve, reject) => {
      //console.log(JSON.stringify(credentials)+'credentials');
      this.showLoader();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {

            let data = res.json();


          this.token = data.token;
          //console.log(JSON.stringify(data)+'user');
          this.currentUser = data.user;
          this.storage.set('token', data.token);
          this.storage.set('user', data.user);

            this.loading.dismiss();
              this.getOzgecmis(data.user.ozgecmis)
              .then((ozgecmis) => {
                // this.ozgecmis = ozgecmis;
              // console.log(data+'data');
            });
            resolve(data);
            // resolve(res.json());
          }, (err) => {
            this.loading.dismiss();
            this.presentToast("Girdiğiniz bilgiler yanlış veya hesabınız aktif değil!");
            //console.log(JSON.stringify(err)+'servis err');
            reject(err);
          });
    });
  }

  forgot(user){
    this.showLoader();
    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url1+'forgot', JSON.stringify(user), {headers: headers})
          .subscribe(res => {
            resolve(res);
            // resolve(res.json());
            this.loading.dismiss();
            this.presentToast('Şifreniz resetlendi. Emailinize 1 saat geçerli geçici şifre gönderildi');

          }, (err) => {
            let erm = JSON.parse(err._body);
            //console.log(erm.error+'forgot err')
            this.loading.dismiss();
            this.presentToast("Geçici şifre gönderilemedi. "+erm.error);
          });
    });
  }

  reset(user){
    this.showLoader();
    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url1+'reset', JSON.stringify(user), {headers: headers})
          .subscribe(res => {
            this.loading.dismiss();
            resolve(res);
            // resolve(res.json());
            this.presentToast('Şifreniz değiştirildi.');

          }, (err) => {
            let erm = JSON.parse(err._body);
            //console.log(erm.error+'forgot err')
            this.loading.dismiss();
            this.presentToast("Yeni şifre kaydedilemedi. "+erm.error);
          });
    });
  }

  logout(){

      this.storage.remove('token');
      this.storage.remove('user');
      this.storage.remove('ozgecmis');
      this.currentUser = undefined;
      this.token = '';
      this.ozgecmis = undefined;
  }

  presentToast(mesaj) {
  let toast = this.toastCtrl.create({
    message: mesaj,
    duration: 5000,
    position: 'top',
    showCloseButton: true,
    closeButtonText: 'OK'
  });
  toast.onDidDismiss(() => {
    // console.log('Dismissed toast');
  });
  toast.present();
  }

  showLoader(){

      this.loading = this.loadingCtrl.create({
          content: 'İşlem yapılıyor...'
      });
      this.loading.present();
  }

  getOzgecmis(ozgecmisId: string){
      let headers = new Headers();
      headers.append('Authorization', this.token);
      return new Promise((resolve, reject) => {
      this.http.get(this.url2 + ozgecmisId, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.ozgecmis = data;
          this.storage.set('ozgecmis', data);
          //console.log(JSON.stringify(data)+"data123");
          resolve(data);
        }, (err) => {
          //console.log(JSON.stringify(err));
          // reject(err);
          this.presentToast('Özgeçmiş alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
}

updateUser(user){
  this.showLoader();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);
    //console.log(JSON.stringify(user)+'updateuser');
    return new Promise((resolve, reject) => {
    this.http.post(this.url + 'updatenormaluser', JSON.stringify(user), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.currentUser = data;
        this.storage.set('user', data);
        //console.log(JSON.stringify(data)+"updateduser");
        this.loading.dismiss();

        resolve(data);
      }, (err) => {
        this.loading.dismiss();
        //console.log(JSON.stringify(err));
        // reject(err);
        this.presentToast('Şifre değiştirilemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
      });
  });
}
}
