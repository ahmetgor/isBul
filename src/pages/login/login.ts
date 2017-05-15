import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams} from 'ionic-angular';
import { UserAuth } from '../../providers/user-auth';
import { SonucPage } from '../sonuc/sonuc';
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string;
  password: string;
  user: any
  loading: any;

  constructor(public navCtrl: NavController, public authService: UserAuth,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public storage: Storage) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.storage.get('user')
        .then((user) => {this.email = user.email;
          this.password = user.password;
        })
        .catch((err) => {return;
        });
        this.showLoader();
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            // console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(SonucPage);
        }, (err) => {
            // console.log("Not already authorized");
            this.loading.dismiss();
        });
    }

  login(){
      this.showLoader();
      let credentials = {
          email: this.email,
          password: this.password
      };
        // console.log(JSON.stringify(credentials)+'credentials');
      this.authService.login(credentials).then((result) => {
        //   this.userService.getUser(credentials.email)
        //   .then((user) => {
        //   this.storage.set('user', user);
        //   // console.log(JSON.stringify(user)+'  loginuser');
        // }, (err) => {
        //     this.loading.dismiss();
        //     // this.presentToast();
        //     // console.log(err);
        // });
        this.loading.dismiss();
        this.navCtrl.setRoot(SonucPage);
      }, (err) => {
          this.loading.dismiss();
            console.log(JSON.stringify(err._body)+'asdasd');
          // let msg = JSON.parse(err._body);
          this.presentToast();
      });
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Girdiğiniz bilgiler yanlış veya hesabınız aktif değil!',
    duration: 4000,
    position: 'top',
    showCloseButton: true,
    closeButtonText: 'OK'
  });

  // toast.onDidDismiss(() => {
  // });
  toast.present();
}

launchSignup(){
  this.navCtrl.push(SignupPage);
}

showLoader(){
  this.loading = this.loadingCtrl.create({
      content: 'Giriş yapılıyor...'
  });
  this.loading.present();
}

}