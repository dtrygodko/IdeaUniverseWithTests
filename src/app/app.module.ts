import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignedInPage } from '../pages/signed-in/signed-in';
import { StartupPage } from '../pages/startup/startup';

export const firebaseAuth = {
  apiKey: "AIzaSyB4Y3D4XRBKMngtEQ0Lm9yDyLvviA2nXNM",
  authDomain: "ionic-schedule-app.firebaseapp.com",
  databaseURL: "https://ionic-schedule-app.firebaseio.com",
  projectId: "ionic-schedule-app",
  storageBucket: "ionic-schedule-app.appspot.com",
  messagingSenderId: "432706833500"
};

@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    SignUpPage,
    SignedInPage,
    StartupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    SignUpPage,
    SignedInPage,
    StartupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
