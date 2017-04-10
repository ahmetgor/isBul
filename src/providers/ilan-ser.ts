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
  basvurKaydetList: any;

  constructor(public http: Http) {
    console.log('Hello IlanSer Provider');
    this.basvurKaydetList = this.getBasvurKaydet();
  }

  createDb() {
     this.ilanlar = [
      {id: 13, isim: 'Developer', firma: 'I2I-Systems', aciklama: 'developer aranıyor', il: 'Kahramanmaraş', tip:'Yarı Z.', egitim: 'Lisans', tecrube: 'Az Tecrübeli (Junior)', ehliyet: 'B', askerlik: 'Yapıldı/Muaf', goruntulenme: '', basvuru: '', olusturan:'', olusurmaTarih:'03/25/2017', guncelleyen:'', guncellemeTarih:'03/25/2017' },
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
