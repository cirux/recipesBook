import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../model/ingredient';
import { PopoverController } from 'ionic-angular';
import { SlOptionsPage } from './sl-options/sl-options';
import { AuthService } from '../../services/auth';

/**
 * 
 */

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private slService: ShoppingListService,
      private popoverCtrl: PopoverController,
      private authService: AuthService){}

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

  onShowOptions(event: MouseEvent){
    console.log("onShowOptions" + event);
    const popover = this.popoverCtrl.create(SlOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if(data.action == 'load'){
          console.log("load action");
          this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.slService.fetchList(token)
                .subscribe(
                  (list) => {
                    if(list){
                      this.listItems = list.json();
                    }else{
                      this.listItems = [];
                    }
                  },
                  error => {
                    console.log(error);
                  }
                );
            }
          );

        } else if (data.action == 'save'){
          console.log("save action");
          this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.slService.storeList(token)
                .subscribe(
                  () => console.log("Success"),
                  error => {
                    console.log(error);
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

}
