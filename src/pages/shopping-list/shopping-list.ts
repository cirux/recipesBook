import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../model/ingredient';
import { PopoverController } from 'ionic-angular';
import { SlOptionsPage } from './sl-options/sl-options';

/**

 */

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private slService: ShoppingListService,
      private popoverCtrl: PopoverController){}

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
    const popover = this.popoverCtrl.create(SlOptionsPage);
    popover.present({ev: event});
  }

}
