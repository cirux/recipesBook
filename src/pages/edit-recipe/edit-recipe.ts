import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes';

/**
 * 
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

  constructor(public navCtrl: NavController, private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipesService: RecipesService) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit(){
    console.log(this.recipeForm);
    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0){
      // transform an array of strings into an array of objects
      ingredients = value.ingredients.map(name => { 
        return {name: name, amount: 1};
      });
    }

    this.recipesService.addRecipe(value.title, value.description, value.difficulty,
      ingredients);

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
      buttons : [
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
            const fArray : FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len > 0){
              for(let i = len - 1; i >= 0; i--){
                fArray.removeAt(i);
              }
               // display a toast message
               const toast = this.toastCtrl.create({
                message : 'All ingredients were deleted!',
                duration : 1000,
                position : 'bottom'
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

  private createNewIngredientAlert(){
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
            if(data.name.trim() == '' || data.name == null){
              // display a toast message
              const toast = this.toastCtrl.create({
                message : 'Please enter a valid value',
                duration : 1500,
                position : 'bottom'
              })
              toast.present();
              return;
            }
            // cast to FormArray
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
             // display a toast message
             const toast = this.toastCtrl.create({
              message : 'Ingredient added!',
              duration : 1000,
              position : 'bottom'
            })
            toast.present();
          }
        }

      ]
    });
  }

  private initializeForm(){
    this.recipeForm = new FormGroup({
      'title' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'difficulty' : new FormControl('Medium', Validators.required),
      // an array of FormControls
      'ingredients': new FormArray([])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

}
