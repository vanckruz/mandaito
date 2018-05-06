import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PerfilProvider } from '../../providers/perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  items: any;
  total: any;
  dataForPay: any;
  user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage, 
    public loading: LoadingController, 
    public perfilProvider: PerfilProvider,
    private alertCtrl: AlertController
  ){
    this.getPerfil();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.getCarrito();
  }

  getCarrito(){
    this.storage.get("carrito").then((carrito) => {
      
      this.items = JSON.parse(carrito);
      console.log(this.items)
      if(this.items != null){
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
      }

    });     
  }

  sumTotal(a, b){
    return parseFloat(a)+parseFloat(b);
  }

  ProccessPayment(){
    this.storage.get("keyTracking").then((id) => {
      let clave = JSON.parse(id);//Firebase key 
      console.log(clave)
      if (clave === null) {
        this.navCtrl.push("ProccessPaymentPage",{
          cart: this.dataForPay,
          precioviaje: this.user.precios.precioviaje
        });
      }else{
        let alert = this.alertCtrl.create({
          title: 'Mensaje',
          subTitle: `Tienes un mandado en progreso su número de orden es ${clave.key}`,
          buttons: [
            {
              text: 'aceptar'
            }
          ]
        });
        alert.present();           
      }
    });
  }

  getPerfil() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (!user) {
        this.navCtrl.setRoot("WelcomePage");
      } else {
        let usuario = JSON.parse(user);
        let loading = this.loading.create({ content: "cargando" });
        loading.present();
        this.perfilProvider.get(usuario.idusuario).subscribe((data) => {
          this.user = data.response.datos;
          console.log(data.response.datos)
          loading.dismiss();
        });
      }

    });//storage user    
  }

}
