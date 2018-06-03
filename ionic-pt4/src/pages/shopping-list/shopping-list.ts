import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Ingredient} from "../../model/ingredient.model";
import {SlOptions} from "../sl-options/sl-options";
import {AuthService} from "../../services/auth.service";

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage implements OnInit{
  listItems:Ingredient[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService:AuthService,
              private shoppingListService:ShoppingListService, private popover:PopoverController,
              private loadingCtrl:LoadingController, private alertCtrl:AlertController) {
  }

  ngOnInit(){

  }

  ionViewWillEnter(){
    this.loadItems();
  }

  onShowOptions(event){
    const loading = this.loadingCtrl.create({content:'Please wait..'});

    const popover = this.popover.create(SlOptions);
    popover.present({ev:event}); //important click vs tap in ionic
    popover.onDidDismiss(data=>{
      if(!data){
        return;
      }
      if(data.action == 'load'){
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then(token=>{
            this.shoppingListService.fetchList(token)
              .subscribe((list:Ingredient[])=>{
                loading.dismiss();
                if(list){
                  this.listItems = list;

                }else{
                  this.listItems = [];
                }
              }, err=> {
                loading.dismiss();
                this.handleError(err);
              })
          })
          .catch(err=>console.log(err))
      }else if(data.action=='store'){
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then(token=>{
            this.shoppingListService.storeList(token)
              .subscribe(()=>{

                loading.dismiss();
                console.log('success')
              }, err=>{
                console.log(err);
                loading.dismiss();
                this.handleError(err);
              })
          })
          .catch(err=>console.log(err))
      }else{
        console.log('nothing');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  onAddItem(f:NgForm){
    this.shoppingListService.addItem(f.value.ingredientName, f.value.ingredientAmount);
    f.resetForm();
    this.loadItems();
  }

  onRemoveItem(index:number){
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  private handleError(err){
    const alert = this.alertCtrl.create({
      title:'Error',
      message:err.message
    });
    alert.present();
  }

  private loadItems(){
    this.listItems = this.shoppingListService.getItems();
  }
}
