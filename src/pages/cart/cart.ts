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

    this.storage.get("carrito").then((carrito) => {
      this.items = JSON.parse(carrito);
      // this.total = this.items.reduce( (valorAnterior, valorActual, indice, vector) => {
      //   console.log(typeof valorAnterior.precio, typeof valorActual.precio)
      //   console.log(valorAnterior.precio, valorActual.precio)
      //   return parseFloat(valorAnterior.precio) + parseFloat(valorActual.precio);
      // })
      this.total = 0;
      for (var i in this.items) { this.total += parseFloat(this.items[i].precio) * parseFloat(this.items[i].cantidad); }
      console.log(this.total)
      console.log(this.items)
    });    
  }

  ProccessPayment(){
    this.navCtrl.push("AddCardPage");
  }
}
