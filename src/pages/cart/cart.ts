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
  dataForPay: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.getCarrito();
  }

  getCarrito(){
    this.storage.get("carrito").then((carrito) => {
      this.items = JSON.parse(carrito);
      this.total = 0;
      // for (var i in this.items) { this.total += parseFloat(this.items[i].precio) * parseFloat(this.items[i].cantidad); }
      for (let i of this.items) { 
        this.total += parseFloat(i.precio) * parseFloat(i.cantidad); 
      }

      this.storage.get("nowstore").then((nowstore) => {
        let tienda = JSON.parse(nowstore);
        this.dataForPay = {
          items: this.items,
          total: this.total,
          tienda: tienda
        }
        console.log(this.dataForPay)
      });
    });     
  }

  ProccessPayment(){
    this.navCtrl.push("ProccessPaymentPage",{
      cart: this.dataForPay
    });
  }
}
