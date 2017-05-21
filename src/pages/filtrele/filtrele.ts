import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the Filtrele page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filtrele',
  templateUrl: 'filtrele.html'
})
export class FiltrelePage {

  detayAra: any;
  sirala: any;
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public events: Events, public geolocation: Geolocation) {

    this.detayAra = navParams.get('detayAra');
    console.log(JSON.stringify(this.detayAra) + 'detay')
    this.sirala = navParams.get('sirala');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltrelePage');
  }

filtrele() {

  console.log(this.sirala+'kapatfiltre');
  // this.sirala = JSON.parse(this.sirala);
    console.log(JSON.stringify(this.detayAra)+'kapatfiltre');
    // console.log(JSON.stringify(this.sirala)+'parsefiltre');
  // this.viewCtrl.dismiss(this.sirala, this.detayAra);
  this.events.publish('ilan:filtered');
  this.navCtrl.pop();
 }

 kapat() {
    this.navCtrl.pop();
  }

 clear() {
 console.log(JSON.stringify(this.detayAra)+'clearfiltre');
 console.log(JSON.stringify(this.sirala)+'clearfiltre');
 // this.viewCtrl.dismiss(this.sirala, this.detayAra);
 this.events.publish('ilan:filtered', 'clear');
 this.navCtrl.pop();
}

// getLoc(selectedValue: any) {
//   this.geolocation.getCurrentPosition().then((position) => {
//   }).catch((error) => {
//   console.log('Error getting location', error);
// });
// }
}
