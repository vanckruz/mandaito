import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-make-methods',
  templateUrl: 'make-methods.html',
})
export class MakeMethodsPage {
  form: FormGroup;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,
    public toast: ToastController,
    public perfil: PerfilProvider,
    private _modal: ModalController
  ){
    this.form = this.fb.group({
      tipotarjeta: ['', Validators.required],
      tarjetanro: ['', Validators.compose([
        Validators.required,
        Validators.pattern('([0-9])*$'),
        Validators.maxLength(16),
        Validators.minLength(16),
      ])],
      tarjetanombre: ['', Validators.required],
      tarjetafecha: ['', Validators.required],
      cvv: ['', Validators.compose([
        Validators.required,
        Validators.pattern('([0-9])*$'),
        Validators.maxLength(4),
        Validators.minLength(4),
      ])],
      pais: ['', Validators.required],
    });      
    this.user = this.navParams.get("user");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeMethodsPage');
  }

  showCountries() {
    let popover = this._modal.create("CountriesListPage");
    popover.present();

    popover.onDidDismiss((data: any) => {
      console.log(data)
      this.form.patchValue({ pais: data.name })
    });//Dismiss popover
  }

  save() {
    if (this.form.valid) {
      let loading = this.loading.create({ content: 'Cargando...' });
      loading.present();
      console.log(this.form.value)
      this.perfil.setMethods(this.user.idusuario, this.form.value).subscribe(data => {
        console.log(data)
        loading.dismiss();
        let toast = this.toast.create({ message: data.msg, duration: 3000, position: 'top' });
        toast.present();
        this.navCtrl.popToRoot();
      }, (error) => {
        loading.dismiss();
        let toast = this.toast.create({ message: "Error al guardar", duration: 3000, position: 'top' });
        toast.present();
      });

    }
  }  

}
