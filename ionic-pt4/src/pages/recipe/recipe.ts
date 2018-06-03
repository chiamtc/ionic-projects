import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../model/recipe.model";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/shopping-list.service";

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe:Recipe;
  index:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private recipeService:RecipesService, private slService:ShoppingListService) {
  }

  ngOnInit(){
    this.recipe = this.navParams.get('selectedRecipe');
    this.index = this.navParams.get('index');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipePage, {mode:'Edit', recipe:this.recipe, index:this.index});
  }

  onAddIngredients(){
    this.slService.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }


}
