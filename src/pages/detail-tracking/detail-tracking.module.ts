import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailTrackingPage } from './detail-tracking';

@NgModule({
  declarations: [
    DetailTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailTrackingPage),
  ],
})
export class DetailTrackingPageModule {}
