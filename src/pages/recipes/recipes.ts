import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

/**
 * Allows addition of a new recipe
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(private navCtrl : NavController) {}

  onNewRecipe(){
    // push new page on the nativagion stack of the recipes tab
    this.navCtrl.push(EditRecipePage, {mode: 'New'});

  }

}
