import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';


@IonicPage()
@Component({
  selector: 'page-detail-order',
  templateUrl: 'detail-order.html',
})
export class DetailOrderPage {
  user: any;
  orderId: any;
  order: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {
    this.user = this.navParams.get("user");
    this.orderId = this.navParams.get("orderId");
  }

  ionViewDidLoad() {
    this.getOrder();
    console.log('ionViewDidLoad DetailOrderPage', this.user, this.order);
  }

  getOrder(){
    let loading = this.loadingCtrl.create({ content: "cargando" });
    loading.present();
    this.orderProvider.detailOrder(this.user.idusuario, this.orderId).subscribe((data) => {
      this.order = data.response.datos;
      console.log(data)
      loading.dismiss();
    });    
  }
}
