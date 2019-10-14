import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { ConnectProvider } from '../connect/connect';
import { InitNavigateProvider } from '../init-navigate/init-navigate';

/*
  Generated class for the ChangeStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChangeStateProvider {

  connectState: boolean = false;
  navigateState: boolean = false;
  user = {} as User;
  

  constructor(
    public http: HttpClient,
    public connect: ConnectProvider,
    public navigate: InitNavigateProvider
    ) {
    console.log('Hello ChangeStateProvider Provider');
    this.connectState = this.connect.connectState;
    this.navigateState = this.navigate.navigateState;
    
    
  }

  resolveState(){
    if(this.connectState = false){
      if(this.navigateState = false){
        console.log("Estado de usuario 0")
      }else{
        console.log("Estado de usuario 1")
      }
    }else{
      console.log("Estado de usuario 2")
    }
  }
  

}
