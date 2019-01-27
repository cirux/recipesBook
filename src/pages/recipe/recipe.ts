import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../model/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list';
import { RecipesService } from '../../services/recipes';

/**
 * Recipe Detail page 
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  /**
   * before the template is rendered
   */
  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onAddIngredients(){
    this.shoppingListService.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();

  }

}
