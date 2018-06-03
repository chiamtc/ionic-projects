import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../model/recipe.model";
import {RecipePage} from "../recipe/recipe";
import {SlOptions} from "../sl-options/sl-options";
import {Ingredient} from "../../model/ingredient.model";
import {AuthService} from "../../services/auth.service";

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes:Recipe[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService:AuthService,
              private recipeService:RecipesService, private popover:PopoverController,
              private loadingCtrl:LoadingController, private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  ionViewWillEnter(){
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode:'New'});
  }

  onLoadRecipe(selectedRecipe:Recipe, index:number){
    this.navCtrl.push(RecipePage, {selectedRecipe:selectedRecipe, index:index});
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
            this.recipeService.fetchList(token)
              .subscribe((list)=>{
                loading.dismiss();
                if(list){
                  this.recipes = list;
                }else{
                  this.recipes = [];
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
            this.recipeService.storeList(token)
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

  private handleError(err){
    const alert = this.alertCtrl.create({
      title:'Error',
      message:err.message
    });
    alert.present();
  }

}
