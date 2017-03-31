import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IlanSer } from '../../providers/ilan-ser';
/*
  Generated class for the Detay page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detay',
  templateUrl: 'detay.html'
})
export class DetayPage {

ilan: any;
basvuruList: Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer) {

                 this.ilan = this.navParams.get('ilan');
                 this.basvuruList = this.navParams.get('basvurulist');
                 this.basvuruList.push({id: 'hebe'});
                 console.log(JSON.stringify(this.basvuruList)+'detay basvuru');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetayPage');
  }

  getDays(d1) {
    // console.log(Date.parse(d1)+' date');
    let diff =  Math.floor(( (new Date()).getTime() - Date.parse(d1) ) / 86400000);
    return diff;
  }

}
