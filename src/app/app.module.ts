import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Deeplinks } from '@ionic-native/deeplinks';

import { AktivitePage } from '../pages/aktivite/aktivite';
import { AraPage } from '../pages/ara/ara';
import { SonucPage } from '../pages/sonuc/sonuc';
import { DetayPage } from '../pages/detay/detay';
import { AyarlarPage } from '../pages/ayarlar/ayarlar';
import { FiltrelePage } from '../pages/filtrele/filtrele';
import { OzgecmisPage } from '../pages/ozgecmis/ozgecmis';
import { OzgecmisDetayPage } from '../pages/ozgecmis-detay/ozgecmis-detay';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { IlanSer } from '../providers/ilan-ser';
import { BasvuruSer } from '../providers/basvuru-ser';
import { UserAuth } from '../providers/user-auth';
import { OzgecmisSer } from '../providers/ozgecmis-ser';
import { DatePipe } from '../pipes/date-pipe';
import { Basvuruldu } from '../pipes/basvuruldu';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera} from '@ionic-native/camera';
import { PassResetPage } from '../pages/pass-reset/pass-reset';

@NgModule({
  declarations: [
    MyApp,
    AktivitePage,
    AraPage,
    AyarlarPage,
    SonucPage,
    DetayPage,
    FiltrelePage,
    OzgecmisPage,
    OzgecmisDetayPage,
    LoginPage,
    SignupPage,
    PassResetPage,
    DatePipe,
    Basvuruldu
  ],
  imports: [
  IonicModule.forRoot(MyApp, {
  monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık' ],
}),
  IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AktivitePage,
    AraPage,
    AyarlarPage,
    SonucPage,
    DetayPage,
    FiltrelePage,
    OzgecmisPage,
    OzgecmisDetayPage,
    LoginPage,
    SignupPage,
    PassResetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IlanSer,
    BasvuruSer,
    UserAuth,
    OzgecmisSer,
    Geolocation,
    Camera,
    Deeplinks,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
