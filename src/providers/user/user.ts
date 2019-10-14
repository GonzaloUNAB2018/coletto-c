import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(
    public http: HttpClient,
    public afDb: AngularFireDatabase

    ) {
    console.log('Hello UserProvider Provider');
  }

  public getUsersDrivers(){
    return this.afDb.list(`Choferes/`);
}

  public getUserDriver(id){
    return this.afDb.object(`Choferes/`+id);
}

public updateUser(user){
    this.afDb.database.ref(`Pops/`+user.id).update(user);

}

}
