import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class AngularFireProvider {

  constructor(
    public http: HttpClient,
    private afDb: AngularFireDatabase
    ) {
    console.log('Hello AngularFireProvider Provider');
  }

  public createUserDriver(user){
    this.afDb.object('Choferes/'+user.uid).set(user);
  }

  public actualiceData(uid){
    return this.afDb.database.ref('Choferes/'+uid);
  }

  public getUserData(uid){
    return this.afDb.object('Choferes/'+uid);
  }

}
