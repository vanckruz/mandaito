import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { RealtimegeoProvider } from '../../providers/realtimegeo/realtimegeo';
import { Storage } from '@ionic/storage';
import { Order } from '../../config/interfaces';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {
  @ViewChild('map') mapElement: ElementRef;
  order: any;
  orderFirebase: Order;  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public storage: Storage,  
    private orderTracking: RealtimegeoProvider
  ){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
    this.loadMap();
    // this.getPerfil();
  }
  
  getMyTrackingOrder(){
    this.orderTracking.getDetailOrder("-L9LVUv2aRc9aaITHaeq")
    .valueChanges()
    .subscribe(
    (data)=> {
      console.log(data)
    })
  }

  loadMap(){

    this.storage.get("position").then((pos) => {
      let posicion = JSON.parse(pos);

      console.log("tiendas", posicion)

      let latLng = new google.maps.LatLng(posicion.latitud, posicion.longitud);
  
      let mapOptions = {
        center: latLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let infowindow = new google.maps.InfoWindow();

      let markerUser = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Te encuentras en aquí',
        icon: 'assets/icon/smiley_happy.png'
      })
      
      markerUser.addListener('click', function () {
        new google.maps.InfoWindow({
          content: "Usted se encuentra aquí"
        }).open(map, markerUser);
      });     

      let markerOrder = new google.maps.Marker({
        position: new google.maps.LatLng(10.3444700, -67.0432500),
        map: map,
        title: 'Los teques',
        icon: 'assets/icon/bag.png'
      });          

      markerOrder.addListener('click', function () {
        new google.maps.InfoWindow({
          content: "Tu orden se encuentra aquí"
        }).open(map, markerOrder);
      });    
// --
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#ff4402" } });
      
      directionsService.route({
        origin: latLng,
        destination: new google.maps.LatLng(10.3444700, -67.0432500),
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          console.log(response.routes[0].legs[0])

        } else {
          window.alert('Error conectando a google ' + status);
        }
      });
      directionsDisplay.setMap(map);
      directionsDisplay.setOptions({ suppressMarkers: true });   
    });
        
  }

  getPerfil() {
    this.storage.get('user').then((user) => {
      console.log(user)

      let usuario = JSON.parse(user);
      let loading = this.loadingCtrl.create({ content: "cargando" });
      loading.present();
      this.orderProvider.getActive(usuario.idusuario).subscribe((data) => {
        this.order = data.response.datos;
        console.log(data)
        loading.dismiss();
      });

    });//storage user    
  }

  detailtracking(){
    this.navCtrl.push('DetailTrackingPage');
  }
}
