import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, LoadingController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../model/recipe';
import { RecipesService } from '../../services/recipes';
import { RecipePage } from '../recipe/recipe';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { AuthService } from '../../services/auth';

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

  constructor(private navCtrl : NavController, 
    private recipesService: RecipesService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthService) {}

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


  /**
   * Displays a popover allowing to save or fetch data from the server
   * @param event 
   */
  onShowOptions(event: MouseEvent){
    console.log("onShowOptions" + event);

    // builds loading panel
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if(!data){
          return;
        }

        if(data.action == 'load'){
          console.log("load action");
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipesService.fetchList(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      loading.dismiss();
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      console.log(error);
                      this.handleError(error.json().error);
                    }
                  );
              }
            );

        } else if (data.action == 'save'){
          console.log("save action");
          loading.present();
          this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.recipesService.storeList(token)
                .subscribe(
                  () => {
                    loading.dismiss();
                    console.log("Success")
                  },
                  error => {
                    loading.dismiss();
                    console.log(error);
                    this.handleError(error.json().error);
                  }
                );
            }
          );
        }else{
          console.log("unknown action " + data.action);
        }
      }
    )
  }

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
