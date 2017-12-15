import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { StartupPage } from '../startup/startup';
 


/**
 * Generated class for the SignedInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signed-in',
  templateUrl: 'signed-in.html',
})
export class SignedInPage {

  startups: Object[] = [];
  startupsSubscription;

  constructor(public alertCtrl: AlertController, public fireDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.startupsSubscription =
      fireDb.list("startups").valueChanges().subscribe(this.onStartupAdded.bind(this));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignedInPage');
  }
  
  onStartupAdded(startups) {
    this.startups = startups;
  }
  
  onViewStartupClick(startup) {
    this.navCtrl.push(StartupPage, {
      "startup": startup
    });
  }
  
  getItemKey(item: Object) {
    var keys = this.startupsSubscription._subscriptions[0]._subscriptions[0].key;
    var index = this.startups.indexOf(item);
    return keys[index].key;
  }
  
  generateKey() : string {
    return Math.random().toString(36).slice(2);
  }
  
  showDataAlert(item: Startup, handler: FunctionStringCallback) {
    this.alertCtrl.create({
      title: "Enter parameters",
      message: "Enter a name and description of your startup",
      inputs: [
        {
          name: "name",
          placeholder: "Name",
          value: item ? item.name : ""
        },
        {
          name: "description",
          placeholder: "Description",
          type:"text",
          value: item ? item.description : ""
        },
        {
           name:"imgUrl",
           placeholder: "image url",
           value: item ? item.imgUrl : ""
        },
        {
         name:"userEmai",
         value: item ? item.userEmai : this.navParams.get("userEmail")
        }
      ],
      buttons: [
        {text: "Cancel"},
        {
          text: "Save",
          handler: handler
        }
      ]
    }).present();
  }
  
  onAddStartupClick() {
    this.showDataAlert(null, this.addStartup.bind(this));
  }
  
  onUpdateStartupClick(item: Startup) {
    var key = this.getItemKey(item);
    this.showDataAlert(item, function(data) {
      this.fireDb.object("startups/" + key).update(data);
    }.bind(this));
  }

  onDeleteStartupClick(item: Startup) {
    var key = this.getItemKey(item);
    this.fireDb.list("startups").remove(key);
   }

  addStartup(data) {
    console.log("Saved clicked");
    this.fireDb.list("startups").push(data);
  }
}

class Startup {
  public name: string;
  public description: string;
  public imgUrl: string;
  public userEmai: string;
  
  constructor(name: string, description: string, imgUrl: string, userEmai: string) {
    this.name = name;
    this.description = description;
    this.imgUrl = imgUrl;
    this.userEmai = userEmai;
  }
}