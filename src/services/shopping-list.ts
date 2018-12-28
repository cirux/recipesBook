import { Ingredient } from "../model/ingredient";

export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    addItem(name: string, amount: number){
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);    // push all elements in array
    }

    getItems(){
        return this.ingredients.slice();    // copy the array
    }

    removeItem(index: number){
        this.ingredients.splice(index, 1);
    }
}