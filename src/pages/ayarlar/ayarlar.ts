import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserAuth } from '../../providers/user-auth';
import { LoginPage } from '../login/login';

/*
  Generated class for the Ayarlar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage(
//   {    segment: 'ayarlar'
// }
)

@Component({
  selector: 'page-ayarlar',
  templateUrl: 'ayarlar.html'
})
export class AyarlarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService: UserAuth) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AyarlarPage');
    if (!this.authService.currentUser) {
    this.authService.checkAuthentication().then((res) => {
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
  }

}
