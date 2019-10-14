import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, NavParams, AlertController, PopoverController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Device } from '@ionic-native/device';
import { NicknamePage } from '../nikname/nickname';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { PrimaryPopoverPage } from '../popovers/primary-popover/primary-popover';
import { ConnectProvider } from '../../providers/connect/connect';
import { InitNavigateProvider } from '../../providers/init-navigate/init-navigate';
import { ChangeWayProvider } from '../../providers/change-way/change-way';
import { User } from '../../models/user';

declare var google

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  user = {} as User;
  uid = this.afAuth.auth.currentUser.uid;
  ref = this.afDb.database.ref('Choferes/'+this.uid);
  chofer = 'assets/imgs/arrow.png'
  myLocation: any;
  public nickname : any = null;
  cameraPos: any;
  connected: boolean;
  public buttonColorCero: string;
  public buttonColorOne: string;
  public buttonColorTwo: string;
  public buttonColorThree: string;
  public buttonColorFour: string;
  buttonActivated: boolean;
  //actualiceDisp: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public afDb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public device: Device,
    public popoverCtrl: PopoverController,
    public connect: ConnectProvider,
    public navigate: InitNavigateProvider,
    public chWay: ChangeWayProvider,
    public toastCtrl: ToastController,
    ) {

      this.nickname = this.afAuth.auth.currentUser.displayName;

      if(this.nickname == null){
        this.navCtrl.setRoot(NicknamePage);
      }else{
        
      }

      
    platform.ready().then(() => {
      this.initMap();
    });
    /*this.ref.on('value', resp => {
      this.deleteMarkers();
      snapshotToArray(resp).forEach(data => {
        if(data.uid !== this.device.uuid) {
          //let image = 'assets/imgs/green-bike.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation);
          this.setMapOnAll(this.map);
        } else {
          let image = 'assets/imgs/blue-bike.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        }
      });
    });*/
    
  }

  selectCero(){
    this.buttonColorCero = 'danger';
    this.buttonColorOne = 'secondary';
    this.buttonColorTwo = 'secondary';
    this.buttonColorThree = 'secondary';
    this.buttonColorFour = 'secondary';
    this.user.seat = 0;
    this.ref.update(this.user);
    const toast = this.toastCtrl.create({
      message: 'Sin asientos disponibles',
      duration: 1000,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
    console.log('Sin asientos disponibles')
  }

  selectOne(){
    this.buttonColorCero = 'secondary';
    this.buttonColorOne = 'danger';
    this.buttonColorTwo = 'secondary';
    this.buttonColorThree = 'secondary';
    this.buttonColorFour = 'secondary';
    this.user.seat = 1;
    this.ref.update(this.user);
    const toast = this.toastCtrl.create({
      message: 'Quedan 1 asientos',
      duration: 1000,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
    console.log('Queda 1 asiento disponible')
  }

  selectTwo(){
    this.buttonColorCero = 'secondary';
    this.buttonColorOne = 'secondary';
    this.buttonColorTwo = 'danger';
    this.buttonColorThree = 'secondary';
    this.buttonColorFour = 'secondary';
    this.user.seat = 2;
    this.ref.update(this.user);
    const toast = this.toastCtrl.create({
      message: 'Quedan 2 asientos',
      duration: 1000,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
    console.log('Quedan 2 asientos disponibles')
  }

  selectThree(){
    this.buttonColorCero = 'secondary';
    this.buttonColorOne = 'secondary';
    this.buttonColorTwo = 'secondary';
    this.buttonColorThree = 'danger';
    this.buttonColorFour = 'secondary';
    this.user.seat = 3;
    this.ref.update(this.user);
    const toast = this.toastCtrl.create({
      message: 'Quedan 3 asientos',
      duration: 1000,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
    console.log('Quedan 3 asientos disponibles')
  }

  selectFour(){
    this.buttonColorCero = 'secondary';
    this.buttonColorOne = 'secondary';
    this.buttonColorTwo = 'secondary';
    this.buttonColorThree = 'secondary';
    this.buttonColorFour = 'danger';
    this.user.seat = 4;
    this.ref.update(this.user);
    const toast = this.toastCtrl.create({
      message: 'Quedan 4 asientos',
      duration: 1000,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
    console.log('Quedan 4 asientos disponibles')
  }

  presentPopover(event) {
    const popover = this.popoverCtrl.create(PrimaryPopoverPage);
    popover.present({
      ev: event
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    console.log(this.nickname);
    this.connect.toDiscconect();
    this.navigate.toStopNavigate();
    this.chWay.toWayOne();
  }

  initMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 5000, timeout: 7000, enableHighAccuracy: true }).then((resp) => {
      this.myLocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 18.5,
        center: this.myLocation,
        disableDefaultUI: true,
        scaleControl: true,
      });
    }).catch(error =>{
      const alert = this.alertCtrl.create({
        title: 'Mapa no ha podido ser cargado',
        buttons: ['OK']
      });
      alert.present();
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      this.updateGeolocation(this.uid, data.coords.latitude,data.coords.longitude);
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/imgs/arrow.png';
      //let camera = new google.maps.moveCamera(updatelocation);
      this.addMarker(updatelocation, image);
      this.setMapOnAll(this.map);
    });
    
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: {
        url : this.chofer,
        scaledSize: new google.maps.Size(50, 50),
      },
    });
    this.markers.push(marker);
  }
  
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  updateGeolocation(uid, lat, lng) {
    if(localStorage.getItem('mykey')) {
      this.ref.update({
      //this.afDb.database.ref('Choferes/'+this.uid+'/'+localStorage.getItem('mykey')).set({
        uid: uid,
        latitude: lat,
        longitude : lng
      });
    } else {
      let newData = this.ref.push();
      newData.update({
        uid: uid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('mykey', newData.key);
    }
  }

  toProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
      this.navCtrl.setRoot(LoginPage);
      console.log('Chofer',this.nickname,'ha cerrado sesión');
    }).catch(error =>{
      console.log('Error de cierre de sesión');
    })
  }


}

/*export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};*/