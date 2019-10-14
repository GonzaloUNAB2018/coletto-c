import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the ChangeStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChangeWayProvider {

  user = {} as User;
  wayState : boolean = false;
  uid : any;

  constructor(
    public http: HttpClient,
    public afDb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    ) {
    console.log('Hello ChangeWayProvider Provider');
    this.uid = this.afAuth.auth.currentUser.uid;
  }

  toWayOne(){
    this.wayState = false;
    console.log("Dirección Plan - Cerro");
    this.user.way = 0;
    this.afDb.object('Choferes/'+this.uid).update(this.user);
  }

  toWayCero(){
    this.wayState = true;
    console.log("Dirección Cerro - Plan");
    this.user.way = 1;
    this.afDb.object('Choferes/'+this.uid).update(this.user);
  }

}
