import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { format, validate } from 'rut.js';

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

  user = {} as User;
  name : any = null;
  password : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private afProvider: AngularFireProvider
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  signUp(){
    if(this.user.password === this.password){
      if(validate(this.user.run)){
        
      let loading = this.loadingCtrl.create({
        content: 'Creando Usuario...'
      });
      loading.present();
      this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(user=>{
        if(user){
          this.user.uid = this.afAuth.auth.currentUser.uid;
          this.user.phoneNumber = '+56'+this.user.phone;
          this.user.run = format(this.user.run);
          if(this.user.uid){
            console.log(this.user);
            this.afProvider.createUserDriver(this.user);
            loading.dismiss();
            let loading2 = this.loadingCtrl.create({
              content: 'Reiniciando...'
            });
            loading2.present();
            loading.onDidDismiss(()=>{
              this.afAuth.auth.signOut().then(()=>{
                setTimeout(() => {
                  this.navCtrl.pop().then(()=>{
                    loading2.dismiss();
                  }).catch(e=>{
                    alert(e);
                    console.log(e);
                  });
                }, 1000);
              }).catch(e=>{
                alert(e);
                console.log(e);
              });
            })
          }
        }
      }).catch(e=>{
        alert(e);
        console.log(e);
      });
      }else{
        alert('RUN no válido!')
      }
    }else{
      alert('Passwords no coinciden');
    }
  }

}
