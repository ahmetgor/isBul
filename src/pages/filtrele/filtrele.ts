import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {

    this.detayAra = navParams.get('detayAra');
    console.log(JSON.stringify(this.detayAra) + 'detay')
    this.sirala = navParams.get('sirala');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltrelePage');
  }

kapat() {
  console.log(this.sirala+'kapatfiltre');
  // this.sirala = JSON.parse(this.sirala);
    console.log(JSON.stringify(this.detayAra)+'kapatfiltre');
    // console.log(JSON.stringify(this.sirala)+'parsefiltre');
  this.viewCtrl.dismiss(this.sirala, this.detayAra);
 }

 clear() {
 this.detayAra = {};
 this.sirala = '{}';
 console.log(JSON.stringify(this.detayAra)+'clearfiltre');
 console.log(JSON.stringify(this.sirala)+'clearfiltre');
 this.viewCtrl.dismiss(this.sirala, this.detayAra);
}

}
