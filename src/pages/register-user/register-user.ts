import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  ModalController,
  // LoadingController, 
  // ToastController 
  } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  form: FormGroup;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public _modal: ModalController,
    // private loading: LoadingController,
    // private toastCtrl: ToastController,
    public fb: FormBuilder    
  ){
    this.form = this.fb.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      code: ['', Validators.required],
      cellphone: ['', Validators.required],
      password: ['', Validators.required]
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

  goToConditions(){
    this.navCtrl.push("TermsAndConditionsPage");
  }

  goToPolicies(){
    this.navCtrl.push("PrivacyPolicyPage");
  }
}
