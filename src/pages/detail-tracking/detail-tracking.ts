import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OrderProvider } from '../../providers/order/order';

@IonicPage()
@Component({
  selector: 'page-detail-tracking',
  templateUrl: 'detail-tracking.html',
})
export class DetailTrackingPage {
  order: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public storage: Storage,
  ) {
    this.getPerfil();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailTrackingPage');
  }

  getPerfil() {
    this.storage.get('user').then((user) => {
      console.log(user)

      let usuario = JSON.parse(user);
      let loading = this.loadingCtrl.create({ content: "cargando" });
      loading.present();

      this.storage.get('keyTracking').then((key) => {
        let idOrder = JSON.parse(key);
        this.orderProvider.detailOrder(usuario.idusuario, idOrder.key).subscribe((data) => {
          this.order = data.response.datos;
          this.order.total = 0;
          
          for (let i of this.order.productos) {
            this.order.total += parseFloat(i.precio) * parseFloat(i.cantidad);
          }          
          console.log(this.order)
          loading.dismiss();
        });
      });

    });//storage user    
  }

}
