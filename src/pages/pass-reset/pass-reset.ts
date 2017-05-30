import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams} from 'ionic-angular';
import { UserAuth } from '../../providers/user-auth';

/*
  Generated class for the PassReset page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pass-reset',
  templateUrl: 'pass-reset.html'
})
export class PassResetPage {

reset: boolean = true;
email: string;
password: string;
resetPasswordToken: string;
loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: UserAuth, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassResetPage');
  }

  resetle(){
      // this.showLoader();
      let user = {
          email: this.email
      };
        // console.log(JSON.stringify(credentials)+'credentials');
      this.authService.forgot(user).then((result) => {
        this.loading.dismiss();
        // this.navCtrl.setRoot(SonucPage);
      }, (err) => {
          // this.loading.dismiss();
            console.log(JSON.stringify(err._body)+'asdasd');
          // this.presentToast('Girdiğiniz kullanıcı geçersiz veya bağ');
      });
  }

  setPass() {
    // this.showLoader();
    let user = {
        email: this.email,
        password: this.password,
        resetPasswordToken: this.resetPasswordToken
    };
      // console.log(JSON.stringify(credentials)+'credentials');
    this.authService.reset(user).then((result) => {
      // this.loading.dismiss();
      // this.navCtrl.setRoot(SonucPage);
    }, (err) => {
        // this.loading.dismiss();
          console.log(JSON.stringify(err._body)+'asdasd');
        // this.presentToast('Girdiğiniz kullanıcı geçersiz veya bağ');
    });
  }
  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Giriş yapılıyor...'
    });
    this.loading.present();
  }
  presentToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 4000,
    position: 'top',
    showCloseButton: true,
    closeButtonText: 'OK'
  });
  toast.present();

}
}
