import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { UserAuth } from './user-auth';

/*
  Generated class for the IlanSer provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IlanSer {

  // url : string = 'https://servistakip.herokuapp.com/api/kayitlar/';
  url : string = 'http://127.0.0.1:8080/api/ilanlar/';
  // ilanlar: Array<any>;
  basvurKaydetList: any;

  constructor(public http: Http, public authService: UserAuth) {
    console.log('Hello IlanSer Provider');
    this.basvurKaydetList = this.getBasvurKaydet();
  }

  getIlanlar(searchTerm, searchKayit, orderBy){

      let headers = new Headers();
      // headers.append('Authorization', this.authService.token);
      let order = JSON.parse(orderBy);
      console.log(JSON.stringify(order)+'order service');
      console.log(order+'order service string');

      return new Promise((resolve, reject) => {
      this.http.get(this.url + `?term=${searchTerm}&kayit=${JSON.stringify(searchKayit)}&orderBy=${JSON.stringify(order)}`
      , {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
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

  // createDb() {
  //    this.ilanlar = [
  //     {id: 13, baslik: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'Kahramanmaraş', tip:'Yarı Z.', egitim: ['Lisans', 'Lise'], tecrube: ['Az Tecrübeli (Junior)', 'Orta Tecrübeli (Midlevel)'], ehliyet: 'B', askerlik: 'Yapıldı/Muaf', goruntulenme: '', basvuru: '', olusturan:'', olusurmaTarih:'03/25/2017', guncelleyen:'', guncellemeTarih:'03/25/2017' },
  //     {id: 14, baslik: 'Analist', firma: 'I2I-Systems', aciklama: 'analist aranıyor', il: 'İstanbul', tip:'Tam Z.', egitim: ['Lisans', 'Lise'], tecrube: ['Çok Tecrübeli (Senior)'], ehliyet: 'B', askerlik: 'Yapıldı/Muaf', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'03/25/2016', guncelleyen:'', guncellemeTarih:'03/25/2016' },
  //     {id: 15, baslik: 'Tester', firma: 'I2I-Systems', aciklama: 'tester aranıyor', il: 'İstanbul', tip:'', egitim: ['Yüksek Lisans'], tecrube:['Az Tecrübeli (Junior)', 'Orta Tecrübeli (Midlevel)'], ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
  //     {id: 16, baslik: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: [], tecrube: ['Az Tecrübeli (Junior)', 'Orta Tecrübeli (Midlevel)'], ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
  //     {id: 17, baslik: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: [], tecrube: [], ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
  //     {id: 18, baslik: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: [], tecrube: [], ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
  //     {id: 19, baslik: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: [], tecrube: [], ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
  //     {id: 20, baslik: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: [], tecrube: [], ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' }
  //   ];
  //   return this.ilanlar;
  // }

  getBasvurKaydet() {
    return [ {id: 13, basvuruldu: 'N', kaydedildi: 'Y'}, {id: 14, basvuruldu: 'Y', kaydedildi: 'N'} ];
  }

  getOzgecmis() {
    let ozgecmis = {
"id": "1",
"isim": "Ahmet",
"soyisim" : "Gör",
"dogumTarihi": "23.11.1983",
"tc": "Evet",
"askerlik": "Yapıldı/Muaf",
"medeni": "Evli",
"ehliyet": "B",
"telefon": "2125366868",
"email": "ahmet@gor.com",
"adres": "Beşiktaş Beşiktaş BeşiktaşBeşiktaşBeşiktaş",
"tecrube": [{"firma": "I2I", "pozisyon": "Analist", "giris": "10.10.2010", "cikis": "10.10.2012", "sehir": "İstanbul", "isTanimiKisa": "billing analiz", "detay": "billing analiz billing analiz", "ulke": 'Türkiye'},
			{"firma": "TTNET", "pozisyon": "Analist", "giris": "10.10.2010", "cikis": "10.10.2012", "sehir": "İstanbul", "isTanimiKisa": "billing analiz", "detay": "billing analiz billing analiz", "ulke": 'Türkiye'}],
"egitim": [{"okul": "İTÜ", "bolum": "Bilgisayar Müh.", "derece": "Lisans", "cikis": "10.10.2012", "sehir": "İstanbul", "ulke": 'Türkiye'},
			{"okul": "İEL", "bolum": "", "derece": "Lise", "cikis": "10.10.2012", "sehir": "İstanbul", "ulke": 'Türkiye'}],
"yabanciDil": [{"dil": "İngilizce", "seviye": "İyi"}, {"dil": "Almanca", "seviye": "Çok iyi"}],
"sertifika": [{"ad": "SQL Expert", "cikis": "01.01.2017", "kurum": "Oracle"},
			  {"ad": "Excel Expert", "cikis": "01.01.2017", "kurum": "Microsoft"}],
"bilgisayar": "SQL, Java"
}

return ozgecmis;
  }

}
