import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { RealtimegeoProvider } from '../../providers/realtimegeo/realtimegeo';

@IonicPage()
@Component({
  selector: 'page-rank-mensajero',
  templateUrl: 'rank-mensajero.html',
})
export class RankMensajeroPage {
  star: number = 0;
  data: any;
  recibido: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderProvider: OrderProvider, public realtimegeoProvider: RealtimegeoProvider, public loading: LoadingController) {
    this.data = this.navParams.get("data");  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankMensajeroPage', this.data);
  }

  rank(){

    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();

    let payload = {
      idmensajero: this.data.mensajero.idmensajero,
      idcliente: this.data.usuario.idusuario,
      calificacion: this.star,
      recibido: this.recibido
    }

    this.orderProvider.calificar(this.data.idOrder, payload).subscribe((data)=>{
      console.log(data)
      loading.dismiss();
      this.realtimegeoProvider.editOrder(this.data.idOrder, {
        status: 4
      }).then(()=>{
        this.orderProvider.changeStatus(this.data.idOrder, { estatus: 4}).subscribe((res)=>{
          console.log(res)
        });
      })
    })

  }
}
