import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterUserProvider } from '../../providers/register-user/register-user';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  form: FormGroup;
  emailError: number = 0;
  blurEmail: boolean = false;
  
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public _modal: ModalController,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public registerUserProvider: RegisterUserProvider,
    public menuCtrl: MenuController
  ){
    this.menuCtrl.enable(false); 
    
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      provincia: ['', Validators.required],
      idprovincia: ['', Validators.required],
      telefono: ['', Validators.required],
      code: ['', Validators.required],
      tipo: 2
      //password: ['', Validators.required]
    });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  showCountries(){
    
    let popover = this._modal.create("CountriesListPage");
    popover.present();
    
    popover.onDidDismiss((data: any) => {
      console.log(data)
      this.form.patchValue({code: '+'+data.callingCodes[0]})
    });//Dismiss popover
  }

  showProvincias(){
    let popover = this._modal.create("ProvinciasPage");
    popover.present();

    popover.onDidDismiss((data: any) => {
      console.log(data)
      this.form.patchValue({ provincia: data.descripcion, idprovincia: data.idprovincia })
    });//Dismiss popover
  }

  goToConditions(){
    this.navCtrl.push("TermsAndConditionsPage");
  }

  goToPolicies(){
    this.navCtrl.push("PrivacyPolicyPage");
  }

  register(){
    if (this.form.valid) {
      let loading = this.loading.create({ content: 'Cargando...' });
      loading.present();    

      this.form.patchValue({ telefono: this.form.value.code + this.form.value.telefono})
      delete this.form.value.provincia;
      delete this.form.value.code;

      console.log(this.form.value)

      this.registerUserProvider.register(this.form.value).subscribe( data => {
        console.log(data)
        loading.dismiss();
        let toast = this.toastCtrl.create({ message: "Registro exitoso le estaremos enviando un correo con su clave de inicio de sesión", duration: 3000, position: 'top' });
        toast.present();     
        this.navCtrl.setRoot("LoginPage")   
      });

    }
  }

  userValid(emailValue) {
    // let like = this.myTrim(e.target.value);
    // let str = emailValue.value;
    let strParse = new String(emailValue.value);
    let like = strParse.trim();
    emailValue.value = like;
    console.log(like);

    this.registerUserProvider.verifyEmail(like).subscribe((data) => {
      this.blurEmail = true;
      if (data.response.existe) {
        this.emailError = 1;
      } else {
        this.emailError = 0;
      }
      console.log(data.response, this.emailError);

    });
  }    
}
