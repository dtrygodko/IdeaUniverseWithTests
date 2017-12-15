import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the StartupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
})
export class StartupPage {
  
  public startup: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams,public fireDb: AngularFireDatabase) {
    this.startup = navParams.get("startup");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartupPage');
  }
}
