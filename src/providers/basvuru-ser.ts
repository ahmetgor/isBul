import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { UserAuth } from './user-auth';


@Injectable()
export class BasvuruSer {
  // url : string = 'https://servistakip.herokuapp.com/api/kayitlar/';
  url : string = 'http://127.0.0.1:8080/api/aktiviteler/';
  kaydedilenList: any;
  basvuruList: any;
  ozgecmisId: string;

  constructor(public http: Http, public authService: UserAuth) {
    console.log('Hello BasvuruSer Provider');
    this.ozgecmisId = "58eba2904be8d6e2c51b0757";

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
    this.http.get(this.url + `/basvuru?ozgecmis=${this.ozgecmisId}`, {headers: headers})
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
    // headers.append('Authorization', this.authService.token);
    return new Promise((resolve, reject) => {
    this.http.get(this.url + `/basvurulist?ozgecmis=${this.ozgecmisId}`, {headers: headers})
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
    this.http.get(this.url + `/kaydedilenlist?ozgecmis=${this.ozgecmisId}`, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
  });
  }

  checkBasvuru(ilanId: any) {
    // return this.basvuruSer.basvuruList.findIndex((item) => {
    //     return (item.id == ilanId && item.basvuruldu == 'Y' ); }) > -1
    // console.log(JSON.stringify(this.basvuruList)+'basvurulist');
    // console.log(ilanId._id);
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
