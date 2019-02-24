import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../model/ingredient';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';

/**
 * Shopping list page
 */

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ionViewWillEnter(){
    this.loadItems();
  }

  onAddItem(form: NgForm){
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number){
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems(){
    this.listItems = this.slService.getItems();
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
                this.slService.fetchList(token)
                  .subscribe(
                    (list) => {
                      loading.dismiss();
                      if (list) {
                        this.listItems = list.json();
                      } else {
                        this.listItems = [];
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
              this.slService.storeList(token)
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
