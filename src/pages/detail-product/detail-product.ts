import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail-product',
  templateUrl: 'detail-product.html',
})
export class DetailProductPage {
  producto: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.producto = this.navParams.get("producto");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProductPage');
  }

  goToMyCart(){
    this.navCtrl.push("CartPage");
  }
}
