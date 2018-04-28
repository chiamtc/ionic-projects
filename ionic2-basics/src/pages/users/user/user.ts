import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector:'page-user',
  templateUrl:'user.html'
})
export class UserPage implements OnInit{
  name:string;
  constructor(private navParams:NavParams, private navCtrl:NavController){
  }

  ngOnInit(){
    this.name = this.navParams.get('name');
  }

  onGoBack(){
    //this.navCtrl.pop(); //previous page only
    this.navCtrl.popToRoot(); //to rootPage
  }
}
