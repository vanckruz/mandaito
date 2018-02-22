import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-favorites-store',
  templateUrl: 'favorites-store.html',
})
export class FavoritesStorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesStorePage');
  }

  goToProductsList(){
    this.navCtrl.push('ListProductsStorePage');
  }  

}
