import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes';
import { Recipe } from '../../model/recipe';

/**
 * Based on the 'mode' property, allows
 * 1. insertion of a new recipe (mode = 'New')
 * 2. editing of an existing recipe (mode = 'Edit')
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  // for 'Edit' mode
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    this.initializeForm();
  }

  onSubmit() {
    console.log(this.recipeForm);
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      // transform an array of strings into an array of objects
      ingredients = value.ingredients.map(name => {
        return { name: name, amount: 1 };
      });
    }

    if (this.mode == 'Edit') {
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty,
        ingredients);
    }

    this.recipeForm.reset();
    // go back to root page
    this.navCtrl.popToRoot();
  }

  /**
   * will open an action sheet
   */
  onManageInfredients() {
    // 1. create actionSheet containing buttons
    const actionSheet = this.actionSheetController.create({
      title: "What do you whant to do?",
      buttons: [
        {
          text: "Add ingredient",
          handler: () => {
            // arrow function
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: "Remove all ingredients",
          role: "destructive",
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              // display a toast message
              const toast = this.toastCtrl.create({
                message: 'All ingredients were deleted!',
                duration: 1000,
                position: 'bottom'
              })
              toast.present();
            }
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });

    // 2. display actionSHeet
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
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
            if (data.name.trim() == '' || data.name == null) {
              // display a toast message
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value',
                duration: 1500,
                position: 'bottom'
              })
              toast.present();
              return;
            }
            // cast to FormArray
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            // display a toast message
            const toast = this.toastCtrl.create({
              message: 'Ingredient added!',
              duration: 1000,
              position: 'bottom'
            })
            toast.present();
          }
        }

      ]
    });
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      // ingredients is an array of FormControls
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      // an array of FormControls
      'ingredients': new FormArray(ingredients)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

}
