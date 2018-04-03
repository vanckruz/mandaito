import { Component, ElementRef, HostListener, NgZone, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-make-directions',
  templateUrl: 'make-directions.html',
})
export class MakeDirectionsPage implements OnInit{
  form: FormGroup;
  user: any;
  @ViewChild("searchbar") searchbar: ElementRef;  
  searchTerm: string;
  place: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,  
    public toast: ToastController,
    public perfil: PerfilProvider
  ){
    this.form = this.fb.group({
      direccion1: ['', Validators.required],
      direccion2: ['', Validators.required],
      provincia: ['', Validators.required],
      ciudad: ['', Validators.required],
      codigopostal: ['', Validators.required]
    }); 
    this.user = this.navParams.get("user");
  }

  ionViewDidLoad() {
    console.log(this.place)
    console.log('ionViewDidLoad MakeDirectionsPage', this.user );
  }
  
  ngOnInit() { 
    console.log('onInit');
  }

  searchPlace(){
    let input = document.getElementById("searchbar");
    console.log(input.getElementsByClassName("searchbar-input"))
    // const inputElement = (<HTMLInputElement>this.searchbar.nativeElement);   
    const inputElement = (<HTMLInputElement>input.getElementsByClassName("searchbar-input")[0]);   
    let autocomplete = new google.maps.places.Autocomplete(inputElement);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      let dataPlace = autocomplete.getPlace();
      this.place = {
        longitud: dataPlace.geometry.location.lat(),
        latitud: dataPlace.geometry.location.lng(),
        direccion: dataPlace.formatted_address
      }
      console.log(this.place);
    });    

  }

  save(){
    if (this.form.valid) {
      let loading = this.loading.create({ content: 'Cargando...' });
      loading.present();
      console.log(this.form.value)
      this.perfil.setDirections(this.user.idusuario, this.form.value).subscribe(data => {
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

  savePlace(){
    let input = document.getElementById("searchbar");
    const inputElement = (<HTMLInputElement>input.getElementsByClassName("searchbar-input")[0]);   
    console.log(this.place)
    if(inputElement.value != "") {
      let loading = this.loading.create({ content: 'Cargando...' });
      loading.present();
      console.log(this.place)
      this.perfil.setDirections(this.user.idusuario, this.place).subscribe(data => {
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

  goToDetail() {
    this.navCtrl.push("DetailDeliveryPage");
  }  
  
}
