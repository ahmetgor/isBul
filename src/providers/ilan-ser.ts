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
      {id: 13, isim: 'Developer', firma: 'I2I-Systems', açıklama: 'developer aranıyor', il: 'İstanbul', tip:'Yarı Z.', eğitim: '', tecrübe: '', ehliyet: '', askerlik: '', görüntülenme: '', başvuru: '', olusturan:'', olusurmaTarih:'25.03.2017', guncelleyen:'', guncellemeTarih:'' },
      {id: 14, isim: 'Analist', firma: 'I2I-Systems', açıklama: 'analist aranıyor', il: 'İstanbul', tip:'', eğitim: '', tecrübe: '', ehliyet: '', askerlik: '', görüntülenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 15, isim: 'Tester', firma: 'I2I-Systems', açıklama: 'tester aranıyor', il: 'İstanbul', tip:'', eğitim: '', tecrübe: '', ehliyet: '', askerlik: '', görüntülenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 16, isim: 'Developer', firma: 'I2I-Systems', açıklama: 'developer aranıyor', il: 'İstanbul', tip:'', eğitim: '', tecrübe: '', ehliyet: '', askerlik: '', görüntülenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 17, isim: 'Developer', firma: 'I2I-Systems', açıklama: 'developer aranıyor', il: 'İstanbul', tip:'', eğitim: '', tecrübe: '', ehliyet: '', askerlik: '', görüntülenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 18, isim: 'Developer', firma: 'I2I-Systems', açıklama: 'developer aranıyor', il: 'İstanbul', tip:'', eğitim: '', tecrübe: '', ehliyet: '', askerlik: '', görüntülenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 19, isim: 'Developer', firma: 'I2I-Systems', açıklama: 'developer aranıyor', il: 'İstanbul', tip:'', eğitim: '', tecrübe: '', ehliyet: '', askerlik: '', görüntülenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' },
      {id: 20, isim: 'Developer', firma: 'I2I-Systems', açıklama: 'developer aranıyor', il: 'İstanbul', tip:'', eğitim: '', tecrübe: '', ehliyet: '', askerlik: '', görüntülenme: '', başvuru: '', olusturan:'', olusurmaTarih:'', guncelleyen:'', guncellemeTarih:'' }
    ];
    return this.ilanlar;
  }

}
