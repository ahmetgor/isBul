import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the IlanSer provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IlanSer {

  ilanlar: Array<any>;

  constructor(public http: Http) {
    console.log('Hello IlanSer Provider');
  }

  createDb() {
     this.ilanlar = [
      {id: 13, isim: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'Yarı Z.', egitim: 'Lisans', tecrube: 'Az Tecrübeli (Junior)', ehliyet: 'B', askerlik: 'Yapıldı/Muaf', goruntulenme: '', basvuru: '', olusturan:'', olusurmaTarih:'03/25/2017', guncelleyen:'', guncellemeTarih:'03/25/2017' },
      {id: 14, isim: 'Analist', firma: 'I2I-Systems', aciklama: 'analist aranıyor', il: 'İstanbul', tip:'Tam Z.', egitim: 'Lisans', tecrube: 'Çok Tecrübeli (Senior)', ehliyet: 'B', askerlik: 'Yapıldı/Muaf', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'03/25/2016', guncelleyen:'', guncellemeTarih:'03/25/2016' },
      {id: 15, isim: 'Tester', firma: 'I2I-Systems', aciklama: 'tester aranıyor', il: 'İstanbul', tip:'', egitim: '', tecrube: '', ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 16, isim: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: '', tecrube: '', ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 17, isim: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: '', tecrube: '', ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 18, isim: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: '', tecrube: '', ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 19, isim: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: '', tecrube: '', ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 20, isim: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'İstanbul', tip:'', egitim: '', tecrube: '', ehliyet: '', askerlik: '', goruntulenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' }
    ];
    return this.ilanlar;
  }

}
