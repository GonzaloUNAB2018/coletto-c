import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { NicknamePage } from '../nikname/nickname';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  name : any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {

    
  }

  login(){
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        this.setRootPage();
        //this.navCtrl.setRoot(HomePage)
      },(err) => {
        let alert = this.alertCtrl.create({
          title: 'Email Incorrecto',
          subTitle: 'Credenciales Password e Email no coinciden, por favor intente nuevamente.',
          buttons: ['OK']
        });
        alert.present();})
        let loader = this.loadingCtrl.create({
          content: "Por favor espere...",
          duration: 3000
        });
        loader.present();
  }

  goToSignup(){
    //this.navCtrl.push(VerifyRegPage);
  }

  back(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /*ionViewCanLeave(){
    this.setRootPage()
  }*/

  setRootPage(){
    this.name = this.afAuth.auth.currentUser.displayName;
    if(this.name == null){
      this.navCtrl.setRoot(NicknamePage);
    }else{
      this.navCtrl.setRoot(HomePage);
      //console.log(this.userId)
    }
  }

}
