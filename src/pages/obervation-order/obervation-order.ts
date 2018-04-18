import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { RealtimegeoProvider } from '../../providers/realtimegeo/realtimegeo';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-obervation-order',
  templateUrl: 'obervation-order.html',
})
export class ObervationOrderPage {
  data: any;
  note: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    public realtimegeoProvider: RealtimegeoProvider, 
    public loading: LoadingController,
    public storage: Storage,
    public toast: ToastController
  ){
    this.data = this.navParams.get("data");  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObervationOrderPage', this.data);
  }

  close(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();

    let payload = {
      observacion: this.note
    }

    this.orderProvider.closeOrder(this.data.idOrder, payload).subscribe((data) => {
      console.log(data)
      loading.dismiss();
      this.realtimegeoProvider.editOrder(this.data.idOrder, {
        status: 5
      }).then(() => {
        this.orderProvider.changeStatus(this.data.idOrder, { estatus: 5 }).subscribe((res) => {
          console.log(res)
          this.storage.remove("keyTracking")
          this.navCtrl.setRoot("PrincipalMenuPage")
          let toast = this.toast.create({ message: "Orden cerrada con exito: ", duration: 8000, position: 'top' });
          toast.present();
        });
      })
    })
  }
}
