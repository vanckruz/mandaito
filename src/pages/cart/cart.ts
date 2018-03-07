import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  items: any;
  total: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');

    // this.storage.get("carrito").then((carrito) => {
    //   this.items = JSON.parse(carrito);
    //   this.total = this.items.reduce((a, b) => a.precio + b.precio, 0)
    //   console.log(this.items)
    // });    
  }

  ProccessPayment(){
    this.navCtrl.push("AddCardPage");
  }
}
