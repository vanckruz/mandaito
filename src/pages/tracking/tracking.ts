import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {
  order: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public storage: Storage,    
  ){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
    this.getPerfil();
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

  detailtracking(){
    this.navCtrl.push('TrackingDetailPage');
  }
}
