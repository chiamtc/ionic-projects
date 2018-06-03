import {Recipe} from "../model/recipe.model";
import {Ingredient} from "../model/ingredient.model";
import {Http,Response} from "@angular/http";
import 'rxjs/Rx';
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class RecipesService{
  private recipes:Recipe[]=[];

  constructor(private http:Http, private authService:AuthService){}

  addRecipe(title:string, description:string, difficulty:string, ingredients:Ingredient[]){
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes(){
    return this.recipes.slice();
  }

  updateRecipe(index:number, title:string, description:string, difficulty:string, ingredients:Ingredient[]){
    this.recipes[index] = new Recipe(title,description,difficulty,ingredients);
  }

  removeRecipe(index:number){
    this.recipes.splice(index,1);
  }

  storeList(token:string){
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-2-recipebook-2875e.firebaseio.com/'+ userId+'/recipes.json?auth='+token, this.recipes)
      .map((response:Response)=>{
        return response.json();
      })
  }

  fetchList(token:string){
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-2-recipebook-2875e.firebaseio.com/'+ userId+ '/recipes.json?auth='+token)
      .map((response:Response)=>{
        const recipes :Recipe[]=response.json() ? response.json():[];
        for(let item of recipes){
          if(!item.hasOwnProperty('ingredients')){
            item.ingredients=[];
          }
        }
        return response.json()
      })
      .do((data)=>{
        if(data) {
          this.recipes = data;
        }else{
          this.recipes=[];
        }
      })
  }
}
