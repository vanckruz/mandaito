import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Slides, Events, Content, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentsProvider } from '../../providers/payments/payments';
import { Order } from '../../config/interfaces';
import { RealtimegeoProvider } from '../../providers/realtimegeo/realtimegeo';

@IonicPage()
@Component({
  selector: 'page-proccess-payment',
  templateUrl: 'proccess-payment.html',
})
export class ProccessPaymentPage {
  user: any;
  dataPayment: any;
  cart: any;
  form: FormGroup;
  @ViewChild(Slides) paySlide: Slides;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public events: Events,  
    public storage: Storage,
    public perfilProvider: PerfilProvider,
    public fb: FormBuilder,
    public paymentsProvider: PaymentsProvider,
    private orderTracking: RealtimegeoProvider,
    private alertCtrl: AlertController
  ){
    this.cart = this.navParams.get("cart");
    this.getPerfil();
    this.form = this.fb.group({
      idusuariometodo: ['', Validators.required],
      idusuariodireccion: ''
    });    
    this.storage.get("position").then(direccion =>{
      let dir = JSON.parse(direccion);
      this.form.patchValue({ idusuariodireccion: dir.idusuariodireccion})
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProccessPaymentPage' );
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ProccessPaymentPage',  this.paySlide);
    if (this.paySlide != undefined) {
      this.paySlide.lockSwipeToNext(true);
      this.paySlide.lockSwipeToPrev(true);
    }
  }


  getPerfil() {
    this.storage.get('user').then((user) => {
      console.log(user)

      let usuario = JSON.parse(user);
      let loading = this.loadingCtrl.create({ content: "cargando" });
      loading.present();
      this.perfilProvider.get(usuario.idusuario).subscribe((data) => {
        this.user = data.response.datos;
        console.log(data.response.datos)
        loading.dismiss();
      });

    });//storage user    
  }

  next(step = null) {
    this.paySlide.lockSwipeToNext(false);
    this.paySlide.slideNext();
    this.paySlide.lockSwipeToNext(true);
    // this.content.scrollTop = 0;
  }

  prev() {
    this.paySlide.lockSwipeToPrev(false);
    this.paySlide.slidePrev();
    this.paySlide.lockSwipeToPrev(true);
  }

  confirmPay(){
    let alert = this.alertCtrl.create({
      title: 'Confirmación',
      message: '¿Desea confirmar la orden?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.pay();
          }
        }
      ]
    });
    alert.present();
  }

  pay(){
    let data = this.form.value;
    data.productos = this.cart.items;
    data.total = this.cart.total;
    data.tienda = this.cart.tienda;
    let loading = this.loadingCtrl.create({ content: 'Cargando...' });
    loading.present();
    this.paymentsProvider.pay(this.user.perfil.idusuario, data).subscribe((data) =>{
      loading.dismiss();
      this.orderTracking.addOrder(data.response.orden.nroorden,{
        idOrder: data.response.orden.nroorden,
        status: 0,
        takeMarket: false,
        takeMensajero: false,
        firstNotificationMarket: false,
        firstNotificationMensajero: false,
        firstNotificationStar: false,
        firstNotificationObservation: false,
        usuario: this.user.perfil,
        tienda: this.cart.tienda
      }).then((data)=>{
        console.log(data);
      })
      this.storage.set("keyTracking", JSON.stringify({ key: data.response.orden.nroorden }));
      // .then((ref) => {
      //   console.log(ref)
      //   this.storage.set("keyTracking", JSON.stringify({ key: ref.key }));
      //   this.orderTracking.editOrder(ref.key, {
      //     usuarioNombre: `${this.user.perfil.nombre} ${this.user.perfil.apellido}`,
      //     tiendaNombre: `${this.cart.tienda.descripcion}`,
      //     key: ref.key
      //   }).then((ref) => console.log(ref))
      // })
      let toast = this.toastCtrl.create({ message: "Orden generada con éxito y llegará pronto su número de orden es: " + data.response.orden.nroorden, duration: 8000, position: 'top' });
      toast.present();
      this.storage.remove("nowstore");
      this.storage.remove("carrito");
      this.navCtrl.setRoot("TrackingPage");      
    });//Payment provider
  }

}
