import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the NiknamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nickname',
  templateUrl: 'nickname.html',
})
export class NicknamePage {

  user = {} as User;
  userFirebase = this.afAuth.auth.currentUser;
  uid = this.userFirebase.uid;
  email = this.userFirebase.email;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,

    ) {
      this.user.email = this.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NiknamePage');
  }

  saveUser(){
    
    this.user.type = "Chofer";
    this.afDb.object('Choferes/'+this.uid).update(this.user);
    this.userFirebase.updateProfile({
      displayName: this.user.nickname,
      photoURL: null
    }).then(() => {
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      const alert = this.alertCtrl.create({
        title: 'No se pudo actualizar su Nickname',
        subTitle: 'Por favor intente nuevamente',
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
