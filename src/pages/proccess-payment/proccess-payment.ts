import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Slides, Events, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentsProvider } from '../../providers/payments/payments';

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
    public paymentsProvider: PaymentsProvider
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

  pay(){
    console.log(this.form.value)
    let data = this.form.value;
    data.productos = this.cart.items;
    data.total = this.cart.total;
    data.tienda = this.cart.tienda;
    console.log(data, this.user)

    let loading = this.loadingCtrl.create({ content: 'Cargando...' });
    loading.present();

    this.paymentsProvider.pay(this.user.perfil.idusuario, data).subscribe((data) =>{
      console.log(data)
      loading.dismiss();
      let toast = this.toastCtrl.create({ message: "Orden generada con éxito y llegará pronto", duration: 3000, position: 'top' });
      toast.present();
      this.storage.remove("nowstore");
      this.storage.set("carrito","[]");
      this.navCtrl.popToRoot();      
    });
  }

}
