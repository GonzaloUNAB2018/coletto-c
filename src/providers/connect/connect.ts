import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';

/*
  Generated class for the ConnectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectProvider {

  connectState: boolean = false;
  uid: any;
  user = {} as User;

  constructor(
    public http: HttpClient,
    public afDb: AngularFireDatabase,
    public afAuth: AngularFireAuth,

    ) {
    console.log('Hello ConnectProvider Provider');
    this.uid = this.afAuth.auth.currentUser.uid;
  }

  toConnect(){
    this.connectState = true;
    console.log("Sistema Conectado");
    this.user.connect = 1;
    this.afDb.object('Choferes/'+this.uid).update(this.user);
  }

  toDiscconect(){
    this.connectState = false;
    console.log("Sistema Desconectado");
    this.user.connect = 0;
    this.afDb.object('Choferes/'+this.uid).update(this.user);
  }

}
