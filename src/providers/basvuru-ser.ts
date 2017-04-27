import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { UserAuth } from './user-auth';
import { OzgecmisSer } from './ozgecmis-ser';

@Injectable()
export class BasvuruSer {
  // url : string = 'https://servistakip.herokuapp.com/api/kayitlar/';
  url : string = 'http://127.0.0.1:8080/api/aktiviteler/';
  kaydedilenList: any = {};
  basvuruList: any = {};
  ozgecmisId: string;

  constructor(public http: Http, public authService: UserAuth,
              public ozgecmisSer: OzgecmisSer) {
    console.log('Hello BasvuruSer Provider');
    this.ozgecmisId = this.ozgecmisSer.ozgecmisId;

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

  getBasvurular() {
    let headers = new Headers();
    // headers.append('Authorization', this.authService.token);
    return new Promise((resolve, reject) => {
    this.http.get(this.url + `basvuru?ozgecmis=${this.ozgecmisId}`, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
  });
}

getKaydedilenler() {
  let headers = new Headers();
  // headers.append('Authorization', this.authService.token);
  return new Promise((resolve, reject) => {
  this.http.get(this.url + `kaydedilen?ozgecmis=${this.ozgecmisId}`, {headers: headers})
    .map(res => res.json())
    .subscribe(data => {
      resolve(data);
    }, (err) => {
      reject(err);
    });
});
}

  getBasvurularList() {
    // return [ {id: 13, basvuruldu: 'N', kaydedildi: 'Y'}, {id: 14, basvuruldu: 'Y', kaydedildi: 'N'} ];
    let headers = new Headers();
    console.log('servis basvurularlist oluştur');
    // headers.append('Authorization', this.authService.token);
    return new Promise((resolve, reject) => {
    this.http.get(this.url + `basvurulist?ozgecmis=${this.ozgecmisId}`, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
  });
  }

  getKaydedilenlerList() {
    // return [ {id: 13, basvuruldu: 'N', kaydedildi: 'Y'}, {id: 14, basvuruldu: 'Y', kaydedildi: 'N'} ];
    let headers = new Headers();
    // headers.append('Authorization', this.authService.token);
    return new Promise((resolve, reject) => {
    this.http.get(this.url + `kaydedilenlist?ozgecmis=${this.ozgecmisId}`, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
  });
  }

  addBasvuru(basvuruId: string) {

    let kayit = {ozgecmis: this.ozgecmisId, basvuru : basvuruId};
    console.log(JSON.stringify(kayit)+'basvuruId');

    this.basvuruList.push(kayit);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', this.authService.token);
      this.http.post(this.url+'basvuru/', JSON.stringify(kayit), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteBasvuru(basvuruId: string) {

    let i = this.basvuruList.findIndex((item) => {
      return (item.basvuru == basvuruId); });
    this.basvuruList.splice(i,1);

      return new Promise((resolve, reject) => {
          let headers = new Headers();
          // headers.append('Authorization', this.authService.token);

          this.http.delete(this.url + `basvuru?ozgecmis=${this.ozgecmisId}&basvuruid=${basvuruId}`, {headers: headers})
          .subscribe((res) => {
              resolve(res);
          }, (err) => {
              reject(err);
          });
      });
  }

  addKaydedilen(kaydedilenId: string) {
    console.log(JSON.stringify(kaydedilenId)+'kaydedilenId');

    let kayit = {ozgecmis: this.ozgecmisId, kaydedilen : kaydedilenId};
    console.log(JSON.stringify(kayit)+'kaydedilenId kayıt');

    this.kaydedilenList.push(kayit);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', this.authService.token);
      this.http.post(this.url+'kaydedilen/', JSON.stringify(kayit), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteKaydedilen(kaydedilenId: string) {
    console.log(JSON.stringify(kaydedilenId)+'kaydedilenId delete');

    let i = this.kaydedilenList.findIndex((item) => {
      return (item.kaydedilen == kaydedilenId); });
    this.kaydedilenList.splice(i,1);

      return new Promise((resolve, reject) => {
          let headers = new Headers();
          // headers.append('Authorization', this.authService.token);

          this.http.delete(this.url + `kaydedilen?ozgecmis=${this.ozgecmisId}&kaydedilenid=${kaydedilenId}`, {headers: headers})
          .subscribe((res) => {
              resolve(res);
          }, (err) => {
              reject(err);
          });
      });
  }

  checkBasvuru(ilanId: any) {
    return this.basvuruList.findIndex((item) => {
        return (item.basvuru == ilanId._id); }) > -1
  }

  checkKaydedilen(ilanId: any) {
    // return this.basvuruSer.basvuruList.findIndex((item) => {
    //     return (item.id == ilanId && item.basvuruldu == 'Y' ); }) > -1
    // console.log(JSON.stringify(this.kaydedilenList)+'kaydedilenList');
    // console.log(ilanId._id);
    return this.kaydedilenList.findIndex((item) => {
        return (item.kaydedilen == ilanId._id); }) > -1
  }

}
