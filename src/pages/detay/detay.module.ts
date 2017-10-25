import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetayPage } from './detay';

@NgModule({
  declarations: [
    DetayPage,
  ],
  imports: [
    IonicPageModule.forChild(DetayPage),
  ],
  exports: [
    DetayPage
  ]
})
export class DetayPageModule {}
