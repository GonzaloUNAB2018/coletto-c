import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../../login/login';
import { ConnectProvider } from '../../../providers/connect/connect';
import { InitNavigateProvider } from '../../../providers/init-navigate/init-navigate';
import { ChangeStateProvider } from '../../../providers/change-state/change-state';
import { User } from '../../../models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { ChangeWayProvider } from '../../../providers/change-way/change-way';

/**
 * Generated class for the PrimaryPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-primary-popover',
  templateUrl: 'primary-popover.html',
})
export class PrimaryPopoverPage {

  background: string;
  contentEle: any;
  textEle: any;
  nickname : any = null;
  connected: boolean;
  navigated: boolean;
  uid: any;
  user = {} as User;
  fbUser = this.afAuth.auth.currentUser
  way : boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public connect: ConnectProvider,
    public navigate: InitNavigateProvider,
    public chState: ChangeStateProvider,
    public chWay: ChangeWayProvider,
    public viewCtrl: ViewController,
    public afDb: AngularFireDatabase,
    public toastCtrl: ToastController
    ) {
      this.nickname = this.fbUser.displayName;
      this.connected = this.connect.connectState;
      this.navigated = this.navigate.navigateState;
      this.uid = this.fbUser.uid;
      this.way = this.chWay.wayState;
  }

  selectWayOne(){
    this.chWay.toWayOne();
    this.viewCtrl.dismiss();
    const toast = this.toastCtrl.create({
      message: 'Dirección de servicio Plan - Cerro',
      duration: 1000,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();

    console.log(this.way)
  };

  selectWayCero(){
    this.chWay.toWayCero();
    this.viewCtrl.dismiss();
    const toast = this.toastCtrl.create({
      message: 'Dirección de servicio Cerro - Plan',
      duration: 1000,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
    console.log(this.way)

  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrimaryPopoverPage');
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
      this.navCtrl.setRoot(LoginPage);
      console.log('Chofer',this.nickname,'ha cerrado sesión');
      this.disconnecting();
      this.stopNav();
      this.user.sesion = 0;
      this.afDb.object('Choferes/'+this.uid).update(this.user);
    }).catch(error =>{
      console.log('Error de cierre de sesión');
    })
  }

  connecting(){
    this.connect.toConnect();
    this.viewCtrl.dismiss();
    this.chState.resolveState();
  }

  disconnecting(){
    this.connect.toDiscconect();
    this.viewCtrl.dismiss();
    this.chState.resolveState();
  }

  initNav(){
    this.navigate.toNavigate();
    this.viewCtrl.dismiss();
    this.chState.resolveState();
  }

  stopNav(){
    this.navigate.toStopNavigate();
    this.viewCtrl.dismiss();
    this.chState.resolveState();
  }

}
