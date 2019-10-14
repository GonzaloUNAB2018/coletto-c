import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: Observable<any>;
  id: any;
  userFirebase = this.afAuth.auth.currentUser;
  uid = this.userFirebase.uid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public toastCtrl: ToastController,
    ) {

      this.user = this.afDb.object('Choferes/'+this.uid).valueChanges();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  saveUser(){
    const toast = this.toastCtrl.create({
      message: 'No disponible',
      duration: 1000,
      position: 'bottom',
      //cssClass: 'toast'
    });
    toast.present();
  }

}
