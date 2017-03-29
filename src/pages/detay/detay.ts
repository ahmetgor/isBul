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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer) {

                 this.ilan = this.navParams.get('ilan');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetayPage');
  }

}
