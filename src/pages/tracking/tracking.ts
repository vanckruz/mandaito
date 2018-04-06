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
  latLngUser: any;
  map: any;
  orderFirebase: Order;  
  orderFlag: boolean = false;
  orderDirection: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public storage: Storage,  
    private orderTracking: RealtimegeoProvider,
  ){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
    this.getMyTrackingOrder();
    this.loadMap();
    // this.getPerfil();
  }
  
  getMyTrackingOrder(){
    this.storage.get("keyTracking").then((id) => {
      let clave = JSON.parse(id);    
      console.log(clave)
      this.orderTracking.getDetailOrder(clave.key)
      .valueChanges()
      .subscribe(
      (data)=> {
        console.log(data)
        this.orderFirebase = data;

        if (this.orderFirebase.lat != undefined && this.orderFirebase.lng != undefined){
          this.drawRoute(this.orderFirebase.lat, this.orderFirebase.lng);
        }
      })
    });
  }

  loadMap(){
    this.storage.get("position").then((pos) => {
      let posicion = JSON.parse(pos);

      console.log("tiendas", posicion)

      this.latLngUser = new google.maps.LatLng(posicion.latitud, posicion.longitud);
  
      let mapOptions = {
        center: this.latLngUser,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let infowindow = new google.maps.InfoWindow();

      let markerUser = new google.maps.Marker({
        position: this.latLngUser,
        map: this.map,
        title: 'Te encuentras en aquí',
        icon: 'assets/icon/smiley_happy.png'
      })
      
      markerUser.addListener('click', function () {
        new google.maps.InfoWindow({
          content: "Usted se encuentra aquí"
        }).open(this.map, markerUser);
      });     

    });//Posición
        
  }

  drawRoute(lat, lng){
    let markerOrder = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.map,
      title: 'Los teques',
      icon: 'assets/icon/bag.png'
    });

    markerOrder.addListener('click', function () {
      new google.maps.InfoWindow({
        content: "Tu orden se encuentra aquí"
      }).open(this.map, markerOrder);
    });

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#ff4402" } });

    directionsService.route({
      origin: this.latLngUser,
      destination: new google.maps.LatLng(lat, lng),
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        console.log(response.routes[0].legs[0])
        this.orderFlag = true;
        this.orderDirection = response.routes[0].legs[0];
      } else {
        window.alert('Error conectando a google ' + status);
      }
    });

    directionsDisplay.setMap(this.map);
    directionsDisplay.setOptions({ suppressMarkers: true });   
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
