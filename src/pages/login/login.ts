import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,
    public loginProvider: LoginProvider,
    public toastCtrl: ToastController,
    public storage: Storage
  ){
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  removeSpaces(email){
    let strParse = new String(email.value);
    let campo = strParse.trim();
    email.value = campo;
    console.log(campo);
  }

  login(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();
    this.loginProvider.test({
      email: this.form.value.email,
      clave: this.form.value.password
    }).subscribe((data) => {
      console.log(data)
      loading.dismiss();
      this.navCtrl.setRoot("PrincipalMenuPage");    
      },
      err => {
        let toast = this.toastCtrl.create({
          message: "He ocurrido un error, por favor intente luego",
          duration: 3000,
          position: 'top'
        });
        toast.present()

        loading.dismiss();
      });
  }


  goToSignIn(){
    this.navCtrl.push("RegisterUserPage");
  }    
}
