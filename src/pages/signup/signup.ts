import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { UserAuth } from '../../providers/user-auth';
import { LoginPage } from '../login/login';
// import { Storage } from '@ionic/storage';
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  email: string;
  password: string;
  password1: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public authService: UserAuth, public loadingCtrl: LoadingController,
      public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignupPage');
  }

  register(){

    this.showLoader();
    let details = {
        email: this.email,
        password: this.password
    };

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      // console.log(result);
      this.presentToast('Kayıt yapıldı, hoşgeldin ' + this.email.substring(0, this.email.indexOf('@')));
      this.navCtrl.setRoot(LoginPage);
    }, (err) => {

      let msg = JSON.parse(err._body);
      // console.log(msg.error+'asdasd');
      this.presentToast(msg.error);
      this.loading.dismiss();
    });

  }

  presentToast(errMsg) {
  let toast = this.toastCtrl.create({
    message: errMsg,
    duration: 6000,
    position: 'top',
    showCloseButton: true,
    closeButtonText: 'OK'
  });

  toast.onDidDismiss(() => {
    // console.log('Dismissed toast');
  });
  toast.present();
}

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Kimlik Doğrulanıyor...'
    });

    this.loading.present();

  }

}
