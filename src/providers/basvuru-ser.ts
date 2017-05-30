import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { UserAuth } from './user-auth';
import { OzgecmisSer } from './ozgecmis-ser';
import {ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class BasvuruSer {
  url : string = 'https://serverisgucvar.herokuapp.com/api/aktiviteler/';
  // url : string = 'http://127.0.0.1:8080/api/aktiviteler/';
  kaydedilenList: any = {};
  basvuruList: any = {};
  ozgecmisId: string;
  ozgecmis: any;
  loading: any;

  constructor(public http: Http, public authService: UserAuth,
              public ozgecmisSer: OzgecmisSer, public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
    console.log('Hello BasvuruSer Provider');
    this.ozgecmisId = this.ozgecmisSer.ozgecmisId;
    this.ozgecmis = this.ozgecmisSer.ozgecmis;
    // this.ozgecmisSer.getOzgecmis(this.ozgecmisId)
    // .then(ozgecmis => {
    //   this.ozgecmis = ozgecmis;
    // });
    console.log(JSON.stringify(this.ozgecmis)+"datadata");
    console.log(JSON.stringify(this.ozgecmisSer.ozgecmisId)+"idid");



    this.getBasvurularList()
    .then(ilanlist => {
      this.basvuruList = ilanlist;
    });
    this.getKaydedilenlerList()
    .then(ilanlist => {
      this.kaydedilenList = ilanlist;
    });
    // this.kaydedilenList = this.getKaydedilenler();
  }

  getBasvurular(skip, limit) {
    let headers = new Headers();
    headers.append('Authorization', this.authService.token);
    return new Promise((resolve, reject) => {
    this.http.get(this.url + `basvuru?ozgecmis=${this.ozgecmisId}&skip=${skip}&limit=${limit}`, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        // reject(err);
        this.presentToast('Başvuru listesi alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
      });
  });
}

getKaydedilenler(skip, limit) {
  let headers = new Headers();
  headers.append('Authorization', this.authService.token);
  return new Promise((resolve, reject) => {
  this.http.get(this.url + `kaydedilen?ozgecmis=${this.ozgecmisId}&skip=${skip}&limit=${limit}`, {headers: headers})
    .map(res => res.json())
    .subscribe(data => {
      resolve(data);
    }, (err) => {
      // reject(err);
      this.presentToast('Kaydedilen listesi alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
    });
});
}

  getBasvurularList() {
    let headers = new Headers();
    console.log('servis basvurularlist oluştur');
    headers.append('Authorization', this.authService.token);
    return new Promise((resolve, reject) => {
    this.http.get(this.url + `basvurulist?ozgecmis=${this.ozgecmisId}`, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        // reject(err);
        this.presentToast('Başvuru listesi alınamadı. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
      });
  });
  }

  getKaydedilenlerList() {
    let headers = new Headers();
    headers.append('Authorization', this.authService.token);
    return new Promise((resolve, reject) => {
    this.http.get(this.url + `kaydedilenlist?ozgecmis=${this.ozgecmisId}`, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        // reject(err);
        // this.presentToast();
      });
  });
  }

  addBasvuru(basvuruId: string) {
    this.showLoader();
    let kayit = {ozgecmis: this.ozgecmisId, basvuru : basvuruId};
    console.log(JSON.stringify(kayit)+'basvuruId');
    if(!this.ozgecmis.enabled) {
      this.loading.dismiss();
      this.presentToast('Pasif özgeçmiş ile başvuru yapılamaz!');
      return;
    }

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      console.log(JSON.stringify(this.ozgecmis)+"addbasvuru");

      this.http.post(this.url+'basvuru/', JSON.stringify(kayit), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          this.basvuruList.push(kayit);
          resolve(res);
          this.loading.dismiss();
        }, (err) => {
          // reject(err);
          this.loading.dismiss();
          this.presentToast('Başvuru eklenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
        });
    });
  }

  deleteBasvuru(basvuruId: string) {
    this.showLoader();
    let i = this.basvuruList.findIndex((item) => {
      return (item.basvuru == basvuruId); });

      return new Promise((resolve, reject) => {
          let headers = new Headers();
          headers.append('Authorization', this.authService.token);

          this.http.delete(this.url + `basvuru?ozgecmis=${this.ozgecmisId}&basvuruid=${basvuruId}`, {headers: headers})
          .subscribe((res) => {
            this.basvuruList.splice(i,1);
              resolve(res);
              this.loading.dismiss();
          }, (err) => {
              // reject(err);
              this.presentToast('Başvuru silinemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
              this.loading.dismiss();
          });
      });
  }

  addKaydedilen(kaydedilenId: string) {
    console.log(JSON.stringify(kaydedilenId)+'kaydedilenId');

    this.showLoader();
    let kayit = {ozgecmis: this.ozgecmisId, kaydedilen : kaydedilenId};
    console.log(JSON.stringify(kayit)+'kaydedilenId kayıt');

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
      this.http.post(this.url+'kaydedilen/', JSON.stringify(kayit), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          this.kaydedilenList.push(kayit);
          resolve(res);
          this.loading.dismiss();
        }, (err) => {
          // reject(err);
          this.presentToast('Kaydedilen eklenemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
          this.loading.dismiss();
        });
    });
  }

  deleteKaydedilen(kaydedilenId: string) {
    console.log(JSON.stringify(kaydedilenId)+'kaydedilenId delete');
    this.showLoader();
    let i = this.kaydedilenList.findIndex((item) => {
      return (item.kaydedilen == kaydedilenId); });

      return new Promise((resolve, reject) => {
          let headers = new Headers();
          headers.append('Authorization', this.authService.token);

          this.http.delete(this.url + `kaydedilen?ozgecmis=${this.ozgecmisId}&kaydedilenid=${kaydedilenId}`, {headers: headers})
          .subscribe((res) => {
            this.kaydedilenList.splice(i,1);
              resolve(res);
              this.loading.dismiss();
          }, (err) => {
              // reject(err);
              this.loading.dismiss();
              this.presentToast('Kaydedilen silinemedi. Bağlantı problemi olabilir. Lütfen tekrar deneyin!');
          });
      });
  }

  checkBasvuru(ilanId: any) {
    // console.log(JSON.stringify(this.basvuruList)+'basvurulist');
    if (Object.keys(this.basvuruList).length == 0) {
      console.log('check false');
      return false;
    }
    return this.basvuruList.findIndex((item) => {
        return (item.basvuru == ilanId._id); }) > -1
  }

  checkKaydedilen(ilanId: any) {
    // return this.basvuruSer.basvuruList.findIndex((item) => {
    //     return (item.id == ilanId && item.basvuruldu == 'Y' ); }) > -1
    // console.log(JSON.stringify(this.kaydedilenList)+'kaydedilenList');
    // console.log(ilanId._id);
    if (Object.keys(this.kaydedilenList).length == 0) {
      console.log('check false');
      return false;
    }
    return this.kaydedilenList.findIndex((item) => {
        return (item.kaydedilen == ilanId._id); }) > -1
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
