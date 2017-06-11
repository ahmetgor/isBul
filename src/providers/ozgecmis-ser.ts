import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { UserAuth } from './user-auth';
import {ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class OzgecmisSer {

  url : string = 'https://serverisgucvar.herokuapp.com/api/ozgecmis/';
  url1 : string = 'https://serverisgucvar.herokuapp.com/api/tools/avatar/';
  // url : string = 'http://127.0.0.1:8080/api/ozgecmis/';
  // url1: string = 'http://127.0.0.1:8080/api/tools/avatar/';
  ozgecmisId: string;
  user: any;
  loading: any;
  ozgecmis: any;

  constructor(public http: Http, public authService: UserAuth,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController,
              public storage: Storage) {
    console.log('Hello OzgecmisSer Provider');

    // this.ozgecmisId = "58eba2904be8d6e2c51b0757";
  //   this.storage.get('user').then((user) => {
  //   this.ozgecmisId = user.ozgecmis;
  //   this.getOzgecmis(user.ozgecmis);
  // });
  }

  getOzgecmis(ozgecmisId: string){
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      return new Promise((resolve, reject) => {
      this.http.get(this.url + ozgecmisId, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.ozgecmis = data;
          this.storage.set('ozgecmis', data);
          console.log(JSON.stringify(data)+"data123");
          resolve(data);
        }, (err) => {
          // reject(err);
          this.presentToast('Özgeçmiş alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
}

updateOzgecmis(paramname: string, kayit: any, ozgecmisUpd: any){
  this.showLoader();
  return new Promise((resolve, reject) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);

    this.http.put(this.url + this.ozgecmisId + '/' + paramname, JSON.stringify(kayit), {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        console.log(JSON.stringify(res)+"avatarres");
        this.ozgecmis = ozgecmisUpd;
        this.storage.set('ozgecmis', ozgecmisUpd);
        resolve(res);
        this.loading.dismiss();
      }, (err) => {
        console.log(JSON.stringify(err)+"avatarerr");
        this.loading.dismiss();
        this.presentToast('Özgeçmiş güncellenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
      });
  });
}

updateOzgecmisAll(kayit: any){
  this.showLoader();
  return new Promise((resolve, reject) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);

    this.http.put(this.url + kayit._id, JSON.stringify(kayit), {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        this.ozgecmis = kayit;
        this.storage.set('ozgecmis', kayit);
        console.log(JSON.stringify(res)+"updateall");
        resolve(res);
        this.loading.dismiss();
      }, (err) => {
        // reject(err);
        this.loading.dismiss();
        this.presentToast('Özgeçmiş güncellenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
      });
  });
}

updateAvatar(resim: String){
  this.showLoader();
  return new Promise((resolve, reject) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.token);

    this.http.post(this.url1, { "resim" : resim }, {headers: headers})
      .map(res => res.json())
      .subscribe(res => {
        resolve(res);
        this.loading.dismiss();
      }, (err) => {
        // reject(err);
        this.loading.dismiss();
        this.presentToast('Resim yüklenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
      });
  });
}

presentToast(mesaj) {
let toast = this.toastCtrl.create({
  message: mesaj,
  duration: 4000,
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

}
