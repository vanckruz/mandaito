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
  @ViewChild(Slides) slides: Slides;
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
      idusuariodireccion: ['', Validators.required]
    });       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProccessPaymentPage', this.cart);
    if (this.slides != undefined) {
      this.slides.lockSwipeToNext(true);
      this.slides.lockSwipeToPrev(true);
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
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
    this.content.scrollTop = 0;
  }

  prev() {
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev();
    this.slides.lockSwipeToPrev(true);
  }

  confirmPay(){
    let alert = this.alertCtrl.create({
      title: 'Confirmación',
      message: '¿Desea confirmar el pago?',
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
      this.orderTracking.addOrder({
        idOrder: data.response.idfactura,
        idUser: this.user.perfil.idusuario,
        status: true,
      }).then((ref) =>{
        console.log(ref, ref.key)
        this.storage.set("keyTracking", JSON.stringify({key: ref.key}));
      })
      let toast = this.toastCtrl.create({ message: "Orden generada con éxito y llegará pronto su identificador es: " + data.response.idfactura, duration: 8000, position: 'top' });
      toast.present();
      this.storage.remove("nowstore");
      this.storage.remove("carrito");
      this.navCtrl.popToRoot();      
    });//Payment provider
  }

}
