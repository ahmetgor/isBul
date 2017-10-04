import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserAuth } from '../../providers/user-auth';
import { LoginPage } from '../login/login';

/*
  Generated class for the HesapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hesap',
  templateUrl: 'hesap.html'
})
export class HesapPage   {

  user: any;
  password: string;
  newpassword: string = "";
  newpassword1: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
              public authService: UserAuth) {

    this.storage.get('user')
        .then((user) => { this.user = user;

          console.log(JSON.stringify(user));
        });
  }

  ionViewDidLoad() {
    this.newpassword = "";
    this.newpassword1 = "";
    console.log('ionViewDidLoad HesapPagePage');
  }

  updateUser(){

      let details : any = {
          email: this.user.email,
          password: this.password
      };

      if(this.newpassword.trim() && this.newpassword.trim()!= "") {
        details.newpassword = this.newpassword;
      }

      this.authService.updateUser(details).then((result) => {
        // this.presentToast('Kaydınız yapıldı, giriş yapabilirsiniz');
          this.authService.logout();
          this.navCtrl.setRoot(LoginPage);

      }, (err) => {
        // let msg = JSON.parse(err._body);
        // console.log(msg.error+'asdasd');
      });
    // });
  }

}
