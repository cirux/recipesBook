import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
              private alertCtrl: AlertController) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit(){
    console.log(this.recipeForm);
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
          role: "desctructive",
          handler: () => {

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
              return;
            }
            // cast to FormArray
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required))
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
