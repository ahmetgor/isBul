import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SonucPage } from './sonuc';

@NgModule({
  declarations: [
    SonucPage,
  ],
  imports: [
    IonicPageModule.forChild(SonucPage),
  ],
  exports: [
    SonucPage
  ]
})
export class SonucPageModule {}
