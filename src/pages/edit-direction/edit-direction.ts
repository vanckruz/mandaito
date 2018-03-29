import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-edit-direction',
  templateUrl: 'edit-direction.html',
})
export class EditDirectionPage {
  form: FormGroup;
  user: any;
  direccion: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,
    public toast: ToastController,
    public perfil: PerfilProvider
  ) {
    this.user = this.navParams.get("user");
    this.direccion = this.navParams.get("direccion");
    this.form = this.fb.group({
      direccion1: this.direccion.direccion1,
      direccion2: this.direccion.direccion2,
      provincia: this.direccion.provincia,
      ciudad: this.direccion.ciudad,
      codigopostal: this.direccion.codigopostal
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDirectionPage', this.user, this.direccion);
  }

  save() {
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();
    console.log(this.form.value)
    this.perfil.editDirection(this.user.perfil.idusuario, this.direccion.idusuariodireccion, this.form.value).subscribe(data => {
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

  goToDetail() {
    this.navCtrl.push("DetailDeliveryPage");
  }

}
