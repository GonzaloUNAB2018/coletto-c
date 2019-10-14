import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the InitNavigateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InitNavigateProvider {

  navigateState: boolean = false;
  uid: any;
  user = {} as User;

  constructor(
    public http: HttpClient,
    public afDb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    ) {
    console.log('Hello InitNavigateProvider Provider');
    this.uid = this.afAuth.auth.currentUser.uid;

  }

  toNavigate(){
    this.navigateState = true;
    console.log("Sistema Navegando");
    this.user.onService = 1;
    this.afDb.object('Choferes/'+this.uid).update(this.user);
  }

  toStopNavigate(){
    this.navigateState = false;
    console.log("Sistema Detenido");
    this.user.onService = 0;
    this.afDb.object('Choferes/'+this.uid).update(this.user);
  }
}
