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
      this.orderProvider.getActive(usuario.idusuario).subscribe((data) => {
        this.order = data.response.datos;
        console.log(data)
        loading.dismiss();
      });

    });//storage user    
  }

}
