import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProductsStorePage } from './list-products-store';

@NgModule({
  declarations: [
    ListProductsStorePage,
  ],
  imports: [
    IonicPageModule.forChild(ListProductsStorePage),
  ],
})
export class ListProductsStorePageModule {}
