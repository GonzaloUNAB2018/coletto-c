import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../pages/home/home';
import { User } from '../models/user';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;

  logged: boolean;

  user = {} as User

  uid: any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      
    this.afAuth.auth.onAuthStateChanged(user=>{
      if (user){
        this.uid = this.afAuth.auth.currentUser.uid;
        this.logged = true;
        this.nav.setRoot(HomePage);
        this.user.sesion = 1;
        this.afDb.object('Choferes/'+this.uid).update(this.user);
      }else{
        this.logged = false;
        this.nav.setRoot(LoginPage);
      }
    })
    });
  }
}

