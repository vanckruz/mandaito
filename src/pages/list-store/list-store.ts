import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-store',
  templateUrl: 'list-store.html',
})
export class ListStorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListStorePage');
  }

  goToProductsList(){
    this.navCtrl.push('ListProductsStorePage');
  }
}
