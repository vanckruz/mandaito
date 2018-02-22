import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-products-store',
  templateUrl: 'list-products-store.html',
})
export class ListProductsStorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  goToMyCart(){
    console.log("funciona");
    this.navCtrl.push("CartPage");
  }

  goDetailProduct(){
    this.navCtrl.push("DetailProductPage");
  }
}
