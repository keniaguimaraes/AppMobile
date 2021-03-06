import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {MovieProvider} from '../providers/movie/movie';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClientModule} from "@angular/common/http";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {MovieDetailsPageModule} from "../pages/movie-details/movie-details.module";
export const firebaseConfig = {
  apiKey: "AIzaSyB7YAWMI_iA8SoN2FX73W80S8f923isjrw",
  authDomain: "ionicapi-17f55.firebaseapp.com",
  databaseURL: "https://ionicapi-17f55.firebaseio.com",
  projectId: "ionicapi-17f55",
  storageBucket: "ionicapi-17f55.appspot.com",
  messagingSenderId: "399736814372"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    MovieDetailsPageModule
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
    MovieProvider
  ]
})
export class AppModule {}
