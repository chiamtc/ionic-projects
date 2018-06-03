import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../model/recipe.model";

/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  difficulties = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
              private actionSheet: ActionSheetController, private alertCtrl: AlertController, private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    console.log(this.mode);
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    this.initForm();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  private initForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];
    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ing of this.recipe.ingredients) {
        ingredients.push(new FormControl(ing.name, Validators.required))
      }
    }
    this.recipeForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'difficulty': new FormControl(difficulty, [Validators.required]),
      'ingredients': new FormArray(ingredients)
    });
  }

  onSubmit() {
    let ingredients = [];
    if (this.recipeForm.value.ingredients.length > 0) {
      ingredients = this.recipeForm.value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }
    console.log(ingredients);
    if (this.mode == 'Edit') {
      this.recipeService.updateRecipe(this.index, this.recipeForm.value.title, this.recipeForm.value.description, this.recipeForm.value.difficulty, ingredients);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value.title, this.recipeForm.value.description, this.recipeForm.value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheet.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredient().present();
          }
        },
        {
          text: 'Remove All Ingredient',
          role: 'destructive',
          handler: () => {
            const fa = (<FormArray>this.recipeForm.get('ingredients'));
            const len = fa.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fa.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All Ingredients were removed',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredient() {
    return this.alertCtrl.create({
      title: 'New Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) { //data.name must be the same as inputs.name
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, [Validators.required]));
          }
        }
      ]
    });

  }

}
