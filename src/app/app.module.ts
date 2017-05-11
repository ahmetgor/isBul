import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AktivitePage } from '../pages/aktivite/aktivite';
import { AraPage } from '../pages/ara/ara';
import { SonucPage } from '../pages/sonuc/sonuc';
import { DetayPage } from '../pages/detay/detay';
import { AyarlarPage } from '../pages/ayarlar/ayarlar';
import { FiltrelePage } from '../pages/filtrele/filtrele';
import { OzgecmisPage } from '../pages/ozgecmis/ozgecmis';
import { OzgecmisDetayPage } from '../pages/ozgecmis-detay/ozgecmis-detay';

import { IlanSer } from '../providers/ilan-ser';
import { BasvuruSer } from '../providers/basvuru-ser';
import { UserAuth } from '../providers/user-auth';
import { OzgecmisSer } from '../providers/ozgecmis-ser';
import { DatePipe } from '../pipes/date-pipe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    DatePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
  monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık' ],

})
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
    OzgecmisDetayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IlanSer,
    BasvuruSer,
    UserAuth,
    OzgecmisSer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
