import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrincipalMenuPage } from './principal-menu';

@NgModule({
  declarations: [
    PrincipalMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PrincipalMenuPage),
  ],
})
export class PrincipalMenuPageModule {}
