import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController  } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { RealtimegeoProvider } from '../../providers/realtimegeo/realtimegeo';
import { Storage } from '@ionic/storage';
import { Order } from '../../config/interfaces';
import { Geolocation } from '@ionic-native/geolocation';
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
  emptyOderFlag: any = false;
  markerOrder: any;
  directionsService: any;
  directionsDisplay: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public storage: Storage,  
    private orderTracking: RealtimegeoProvider,
    private geolocation: Geolocation,
    private alertCtrl: AlertController
  ){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
    this.getMyTrackingOrder();
    this.getPosition();
    // this.getPerfil();
  }
  
  presentAlert($msg) {
    let alert = this.alertCtrl.create({
      title: 'Notificación',
      subTitle: $msg,
      buttons: ['aceptar']
    });
    alert.present();
  }

  
  getMyTrackingOrder(){
    this.storage.get("keyTracking").then((id) => {
      let clave = JSON.parse(id);//Firebase key 
      console.log(clave)
      if(clave !== null){
        this.orderTracking.getDetailOrder(clave.key)
        .valueChanges()
        .subscribe(
        (data)=> {
          console.log(data)
          if (data !== null){
            this.emptyOderFlag = true;
            this.orderFirebase = data;

            // if (this.orderFirebase.takeMarket && !this.orderFirebase.firstNotificationMarket && !this.orderFirebase.takeMensajero) {
            if (this.orderFirebase.status === 1) {
              this.presentAlert("Su orden ha sido tomada por el comercio y está siendo preparada");
            }

            // if (this.orderFirebase.takeMarket && !this.orderFirebase.firstNotificationMensajero && this.orderFirebase.takeMensajero){
            if (this.orderFirebase.status === 2){
              this.presentAlert("Su orden ha sido tomada por un mensajero, ya va en camino");
            }

            if (this.orderFirebase.status === 2 && this.orderFirebase.mensajero !== undefined){
              console.log(this.orderFirebase.mensajero.lat, this.orderFirebase.mensajero.lng)
              this.drawRoute(this.orderFirebase.mensajero.lat, this.orderFirebase.mensajero.lng);
            }

            if (this.orderFirebase.status === 3) {
              this.navCtrl.setRoot("RankMensajeroPage", {
                data: this.orderFirebase
              })
            }

            if (this.orderFirebase.status === 4) {
              this.navCtrl.setRoot("ObervationOrderPage", {
                data: this.orderFirebase
              })
            }            

          }//If la data de firebase no existe
        })
      }else{
        this.emptyOderFlag = false;
      }
    });
  }

  getPosition(){
    this.storage.get("position").then((pos) => {
      let posicion = JSON.parse(pos);
      console.log(posicion, typeof posicion)

      if (posicion === null) {
        let loading = this.loadingCtrl.create({ content: 'Obteniendo Ubicación por favor espere...' });
        loading.present().then(() => {
          this.geolocation.getCurrentPosition().then((resp) => {
            loading.dismiss();
            let position = {
              latitud: resp.coords.latitude,
              longitud: resp.coords.longitude
            }

            this.storage.set("position", JSON.stringify(position)).then((data) => {
              this.loadMap(data)
            })
          }).catch((error) => {
            console.log('Error getting location', error);
          });//Get current position
        });//loading
      } else {
        this.loadMap(posicion);
      }
    });
  }

  loadMap(posicion){
    console.log("posicion tracking", posicion)

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
      icon: 'assets/icon/smiley_happy.png',
      // animation: google.maps.Animation.DROP,      
    })
    
    markerUser.addListener('click', function () {
      new google.maps.InfoWindow({
        content: "Usted se encuentra aquí"
      }).open(this.map, markerUser);
    });     
        
  }

  drawRoute(lat, lng){
    let currentPositionOrder = new google.maps.LatLng(lat, lng)
    if (this.markerOrder == undefined){
      this.markerOrder = new google.maps.Marker({
        position: currentPositionOrder,
        map: this.map,
        title: 'Tu orden se encuentra aquí',
        icon: 'assets/icon/bag.png',
        // animation: google.maps.Animation.DROP,        
      });
      this.markerOrder.addListener('click', function () {
        new google.maps.InfoWindow({
          content: "Tu orden se encuentra aquí"
        }).open(this.map, this.markerOrder);
      });
    }else{
      this.markerOrder.setPosition(currentPositionOrder);
    }
    console.log(this.markerOrder, typeof this.markerOrder, this.latLngUser)

    this.directionsService = new google.maps.DirectionsService;
    if (this.directionsDisplay === undefined){
      this.directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#ff4402", strokeOpacity: 0.9, strokeWeight: 6  } });
    }

    this.directionsService.route({
      origin: this.latLngUser,
      destination: currentPositionOrder,
      travelMode: 'DRIVING'
    }, (response, status) => {
      console.log(response, status)
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log(response.routes[0].legs[0])
        this.orderFlag = true;
        this.orderDirection = response.routes[0].legs[0];
      } else {
        window.alert('Error conectando a google ' + status);
      }
    });

    this.directionsDisplay.setMap(null);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({ suppressMarkers: true });   
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
