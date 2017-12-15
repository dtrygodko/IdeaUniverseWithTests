import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignedInPage } from '../signed-in/signed-in';
import { SignUpPage } from '../sign-up/sign-up';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */




@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
  providers: [AngularFireAuth]
})
export class SignInPage {

  @ViewChild("userName") userName;
  @ViewChild("password") password;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  alert(title: string, subTitle: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ["OK"]
    }).present();
  }

 /* validateUserName(userName) {
    if (!/^[a-zA-Z0-9]+$/.test(userName)) {
      this.alert("Error", "User name can contain only english letters and digits.");
      return false;
    }
    return true;
  }*/

  signIn() {
    let userName = this.userName.value;
  /*  if (!this.validateUserName(userName)) {
      return;
    }
    userName = userName + "@domain.com";*/
    let password = this.password.value;

    this.fire.auth.signInWithEmailAndPassword(userName, password)
      .then(this.signInCallback.bind(this))
      .catch(this.signInError.bind(this));
  }

  signInCallback(data) {
    this.alert("Success", "You are successfully signed in.");
    this.navCtrl.setRoot(SignedInPage, {
      "userEmail": data.email
    });
    /*this.navCtrl.push(SignedInPage, {
      "userEmail": data.email
    });*/
  }

  signInError(error) {
    this.alert("Error", error.message);
  }

  signUp() {
    this.navCtrl.push(SignUpPage);
  }
}

