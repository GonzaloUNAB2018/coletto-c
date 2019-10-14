import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

//PAGES
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from '../pages/login/login.module';
import { NicknamePageModule } from '../pages/nikname/nickname.module';
import { ProfilePageModule } from '../pages/profile/profile.module';

//NATIVE
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//POPOVER
import { PrimaryPopoverPageModule } from '../pages/popovers/primary-popover/primary-popover.module';

//FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

//PPROVIDER
import { ConnectProvider } from '../providers/connect/connect';
import { HttpClientModule } from '@angular/common/http';
import { InitNavigateProvider } from '../providers/init-navigate/init-navigate';
import { ChangeStateProvider } from '../providers/change-state/change-state';
import { ChangeWayProvider } from '../providers/change-way/change-way';
import { UserProvider } from '../providers/user/user';

const firebaseConfig = {
  apiKey: "AIzaSyDaRTTHOVxs0RwAw9baRO6_6JSGiipTQu8",
    authDomain: "coletto-app.firebaseapp.com",
    databaseURL: "https://coletto-app.firebaseio.com",
    projectId: "coletto-app",
    storageBucket: "coletto-app.appspot.com",
    messagingSenderId: "953525692835",
    appId: "1:953525692835:web:dfeb73a0c67e5717c0d216"

};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginPageModule,
    NicknamePageModule,
    ProfilePageModule,
    PrimaryPopoverPageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Device,
    ConnectProvider,
    InitNavigateProvider,
    ChangeStateProvider,
    ChangeWayProvider,
    UserProvider,
  ]
})
export class AppModule {}
