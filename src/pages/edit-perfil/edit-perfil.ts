import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Events, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {
  form: FormGroup;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public events: Events,
    public _modal: ModalController,
    public perfilProvider: PerfilProvider
  ){
    this.user = this.navParams.get("user");
    this.form = this.fb.group({
      nombre: this.user.nombre,
      apellido: this.user.apellido,
      telefono: this.user.telefono,
      idprovincia: this.user.idprovincia,
      provincia: this.user.provincia
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPerfilPage');
  }

  showProvincias() {
    let popover = this._modal.create("ProvinciasPage");
    popover.present();

    popover.onDidDismiss((data: any) => {
      console.log(data)
      this.form.patchValue({ provincia: data.descripcion, idprovincia: data.idprovincia })
    });//Dismiss popover
  }

  edit(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();

    delete this.form.value.provincia;
    console.log(this.form.value)

    this.perfilProvider.edit(this.user.idusuario, this.form.value).subscribe(data => {
      console.log(data)
      loading.dismiss();
      let toast = this.toastCtrl.create({ message: "Se ha actualizado el usuario con exito", duration: 3000, position: 'top' });
      toast.present();
      this.navCtrl.popToRoot();
    });
  }
}
