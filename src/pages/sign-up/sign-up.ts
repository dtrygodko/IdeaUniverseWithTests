import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignedInPage } from '../signed-in/signed-in';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  @ViewChild("userName") userName;
  @ViewChild("password") password;
  @ViewChild("confirmPassword") confirmPassword;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
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
  }
  */
  signUp() {
    let userName = this.userName.value;
  /*  if (!this.validateUserName(userName)) {
      return;
    }
    userName = userName + "@domain.com";*/
    let password = this.password.value;
    let confirmPassword = this.confirmPassword.value;
    
    if (password === confirmPassword) {
      this.fire.auth.createUserWithEmailAndPassword(userName, password)
        .then(this.signUpCallback.bind(this))
        .catch(this.onSignUpError.bind(this));
    } else {
      this.alert("Error", "Passwords don't match.");
    }
  }
  
  signUpCallback(data) {
    this.alert("Success", "You were successfully registered.");
    this.navCtrl.setRoot(SignedInPage);
    this.navCtrl.push(SignedInPage, {
      "userEmail": data.email
    });
  }
  
  onSignUpError(error) {
    this.alert("Error", error.message);
  }
}
