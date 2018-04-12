import { Component, ElementRef, HostListener, NgZone, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-make-directions',
  templateUrl: 'make-directions.html',
})
export class MakeDirectionsPage implements OnInit {

  @ViewChild("searchbar") searchbar: ElementRef;
  @ViewChild('map') mapElement: ElementRef;
  user: any;
  searchTerm: string;
  place: any;
  latLngUser: any;
  map: any;
  markerUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,
    public toast: ToastController,
    public perfil: PerfilProvider,
    public storage: Storage,
    public geolocation: Geolocation,
  ) {

    this.user = this.navParams.get("user");
  }

  ionViewDidLoad() {
    console.log(this.place)
    console.log('ionViewDidLoad MakeDirectionsPage');
    this.getPosition();
  }

  ngOnInit() {
    console.log('onInit');
  }

  getPosition() {
    // this.storage.get("position").then((pos) => {
    //   let posicion = JSON.parse(pos);
    //   console.log(posicion, typeof posicion)

      // if (posicion === null) {
      let loading = this.loading.create({ content: 'Obteniendo Ubicación por favor espere...' });
      loading.present().then(() => {
        this.geolocation.getCurrentPosition().then((resp) => {
          loading.dismiss();
          let position = {
            latitud: resp.coords.latitude,
            longitud: resp.coords.longitude
          }
          
          this.loadMap(position)
        }).catch((error) => {
          console.log('Error getting location', error);
        });//Get current position
      });//loading
      // } else {
      //   this.loadMap(posicion);
      // }
    // });
  }

  loadMap(posicion) {

    this.latLngUser = new google.maps.LatLng(posicion.latitud, posicion.longitud);

    let mapOptions = {
      center: this.latLngUser,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let infowindow = new google.maps.InfoWindow();

    this.markerUser = new google.maps.Marker({
      position: this.latLngUser,
      map: this.map,
      title: 'Te encuentras en aquí',
      icon: 'assets/icon/smiley_happy.png',
      draggable: true,
      animation: google.maps.Animation.DROP,
    })

    console.log("posicion tracking", posicion, typeof posicion,posicion.latitud, posicion.longitud, this.map, this.latLngUser)
    
    this.markerUser.addListener('click', () => {
      new google.maps.InfoWindow({
        content: "Usted se encuentra aquí"
      }).open(this.map, this.markerUser);
    });

    this.markerUser.addListener('dragend', () => {
      console.log(this.markerUser);
      let geocoder = new google.maps.Geocoder();
      let latlng = { lat: this.markerUser.position.lat(), lng: this.markerUser.position.lng() };
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === 'OK') {
          console.log(results[0]);
          let result = results[0];
          this.place = {
            longitud: result.geometry.location.lng(),
            latitud: result.geometry.location.lat(),
            direccion: result.formatted_address
          }
          let windowContent = `
          <div class="card">
          <header class="card-header">
          <b>Dirección</b>
          </header>
          <div class="card-content">
            <div class="textf">
              ${ result.formatted_address}
            </div>
            </div>      
          </div>`;
          let infoWindowsDirection = new google.maps.InfoWindow();
          infoWindowsDirection.setContent(windowContent);
          infoWindowsDirection.open(this.map, this.markerUser);
          console.log(this.place)
        } else {
          // alert('Geocode was not successful for the following reason: ' + status);
          let toast = this.toast.create({ message: "ha sobrepasado el límite de consultas", duration: 3000, position: 'top' });
          toast.present();
        }
      }); this.markerUser.position.lat()
    });

  }

  searchPlace() {
    let input = document.getElementById("searchbar");
    console.log(input.getElementsByClassName("searchbar-input"))
    // const inputElement = (<HTMLInputElement>this.searchbar.nativeElement);   
    const inputElement = (<HTMLInputElement>input.getElementsByClassName("searchbar-input")[0]);
    let autocomplete = new google.maps.places.Autocomplete(inputElement);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      let dataPlace = autocomplete.getPlace();
      this.place = {
        longitud: dataPlace.geometry.location.lng(),
        latitud: dataPlace.geometry.location.lat(),
        direccion: dataPlace.formatted_address
      }
      let latLng = new google.maps.LatLng(dataPlace.geometry.location.lat(), dataPlace.geometry.location.lng());
      this.map.setCenter(latLng)
      this.markerUser.setPosition(latLng)
      console.log(this.place);
    });

  }

  savePlace() {
    let input = document.getElementById("searchbar");
    const inputElement = (<HTMLInputElement>input.getElementsByClassName("searchbar-input")[0]);
    console.log(this.place)
    if (this.place != undefined) {
      let loading = this.loading.create({ content: 'Cargando...' });
      loading.present();
      console.log(this.place)
      this.perfil.setDirections(this.user.idusuario, this.place).subscribe(data => {
        console.log(data.response.objDireccion)
        loading.dismiss();
        let toast = this.toast.create({ message: "Dirección guardada con exito", duration: 5000, position: 'top' });
        toast.present();
        this.storage.set("position", JSON.stringify(data.response.objDireccion)).then(() => this.navCtrl.setRoot("PrincipalMenuPage"))
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
