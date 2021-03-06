import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import {ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UserAuth } from './user-auth';

/*
  Generated class for the IlanSer provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IlanSer {

  url : string = 'http://127.0.0.1:8080/api/ilanlar/';
  // url : string = 'https://isgucvarisarayan.herokuapp.com/api/ilanlar/';

  // url : string = window.location.origin+'/api/ilanlar/';
  // ilanlar: Array<any>;
  basvurKaydetList: any;
  loading: any;
  sehirler = [
    {"sehir":"İstanbul"},{"sehir":"Ankara"},{"sehir":"İzmir"},{"sehir":"Adana"},{"sehir":"Adıyaman"},{"sehir":"Afyonkarahisar"}
   ,{"sehir":"Ağrı"},{"sehir":"Aksaray"},{"sehir":"Amasya"},{"sehir":"Antalya"},{"sehir":"Ardahan"},{"sehir":"Artvin"}
   ,{"sehir":"Aydın"},{"sehir":"Balıkesir"},{"sehir":"Bartın"},{"sehir":"Batman"},{"sehir":"Bayburt"},{"sehir":"Bilecik"}
   ,{"sehir":"Bingöl"},{"sehir":"Bitlis"},{"sehir":"Bolu"},{"sehir":"Burdur"},{"sehir":"Bursa"},{"sehir":"Çanakkale"},{"sehir":"Çankırı"}
   ,{"sehir":"Çorum"},{"sehir":"Denizli"},{"sehir":"Diyarbakır"},{"sehir":"Düzce"},{"sehir":"Edirne"},{"sehir":"Elazığ"}
   ,{"sehir":"Erzincan"},{"sehir":"Erzurum"},{"sehir":"Eskişehir"},{"sehir":"Gaziantep"},{"sehir":"Giresun"},{"sehir":"Gümüşhane"}
   ,{"sehir":"Hakkari"},{"sehir":"Hatay"},{"sehir":"Iğdır"},{"sehir":"Isparta"},{"sehir":"Kahramanmaraş"},{"sehir":"Karabük"}
   ,{"sehir":"Karaman"},{"sehir":"Kars"},{"sehir":"Kastamonu"},{"sehir":"Kayseri"},{"sehir":"Kırıkkale"},{"sehir":"Kırklareli"}
   ,{"sehir":"Kırşehir"},{"sehir":"Kilis"},{"sehir":"Kocaeli"},{"sehir":"Konya"},{"sehir":"Kütahya"},{"sehir":"Malatya"}
   ,{"sehir":"Manisa"},{"sehir":"Mardin"},{"sehir":"Mersin"},{"sehir":"Muğla"},{"sehir":"Muş"},{"sehir":"Nevşehir"}
   ,{"sehir":"Niğde"},{"sehir":"Ordu"},{"sehir":"Osmaniye"},{"sehir":"Rize"},{"sehir":"Sakarya"},{"sehir":"Samsun"}
   ,{"sehir":"Siirt"},{"sehir":"Sinop"},{"sehir":"Sivas"},{"sehir":"Şırnak"},{"sehir":"Tekirdağ"},{"sehir":"Tokat"}
   ,{"sehir":"Trabzon"},{"sehir":"Tunceli"},{"sehir":"Şanlıurfa"},{"sehir":"Uşak"},{"sehir":"Van"},{"sehir":"Yalova"}
   ,{"sehir":"Yozgat"},{"sehir":"Zonguldak"}
  ];

  constructor(public http: Http, public authService: UserAuth,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    //console.log('Hello IlanSer Provider');
    // this.basvurKaydetList = this.getBasvurKaydet();
  }

  getIlanlar(searchTerm, searchKayit, orderBy, skip, limit){
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      let order = JSON.parse(orderBy);
      searchKayit.enabled = true;
      //console.log(JSON.stringify(order)+'order service');
      //console.log(order+'order service string');

      return new Promise((resolve, reject) => {
      this.http.get(this.url + `?term=${searchTerm}&kayit=${JSON.stringify(searchKayit)}&orderBy=${JSON.stringify(order)}&skip=${skip}&limit=${limit}`
      , {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          // reject(err);
          this.presentToast('İlan listesi alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
      // console.log(JSON.stringify(orderBy)+'kayıtlar');
    //   if (Object.keys(orderBy).length == 0 || orderBy == 'undefined') {
    //   orderBy = { "createdAt": -1 };
    // }
    // return  this.http.get(url, {headers: headers})
    //     .map((res: Response) => {console.log(JSON.stringify(res.json()));
    //       res.json().data as Hero[];})
    //     .catch(this.handleError);
  }
  getIlan(ilanId: string){
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      return new Promise((resolve, reject) => {
      this.http.get(this.url + ilanId, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          // reject(err);
          this.presentToast('İlan listesi alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
  }

  getNot(userId: string){
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      return new Promise((resolve, reject) => {
      this.http.get(this.url + userId, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          // reject(err);
          this.presentToast('Bildirim listesi alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
  }

  updateNot(userId: string){
      this.showLoader();
      return new Promise((resolve, reject) => {

        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);
        //console.log(JSON.stringify(kayit)+'order service add ilan');

        this.http.put(this.url + '/' + userId, {headers: headers})
          .map(res => res.json())
          .subscribe(res => {
            this.loading.dismiss();
            resolve(res);
          }, (err) => {
            this.loading.dismiss();
            this.presentToast('Bildirimler güncellenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
          });
      });
    }

  presentToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
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
