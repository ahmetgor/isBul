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
    // this.basvuruList = this.getBasvurular();
    // this.kaydedilenList = this.getKaydedilenler();
    this.ozgecmisId = "58eba2904be8d6e2c51b0757";
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

  getKaydedilenler() {
    return [ {id: 13, basvuruldu: 'N', kaydedildi: 'Y'}, {id: 14, basvuruldu: 'Y', kaydedildi: 'N'} ];
  }

}
