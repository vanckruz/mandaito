import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
    public fb: FormBuilder
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
    this.navCtrl.setRoot("PrincipalMenuPage");    
  }

  goToSignIn(){
    this.navCtrl.push("RegisterUserPage");
  }    
}
