import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../model/recipe';
import { RecipesService } from '../../services/recipes';
import { RecipePage } from '../recipe/recipe';

/**
 * Allows addition of a new recipe
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(private navCtrl : NavController, private recipesService: RecipesService) {}

  ionViewWillEnter(){
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe(){
    // push new page on the nativagion stack of the recipes tab
    this.navCtrl.push(EditRecipePage, {mode: 'New'});

  }

  onLoadRecipe(recipe: Recipe, index: number){
    // go to recipe detail page
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

}
