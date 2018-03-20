import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeDirectionsPage } from './make-directions';

@NgModule({
  declarations: [
    MakeDirectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeDirectionsPage),
  ],
})
export class MakeDirectionsPageModule {}
