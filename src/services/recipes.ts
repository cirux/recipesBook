import { Recipe } from "../model/recipe";
import { Ingredient } from "../model/ingredient";

/**
 * this service is added into the providers array in app.module.ts
 */
export class RecipesService {
    private recipes: Recipe[] = [];

    addRecipe(title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]) {

            this.recipes.push(new Recipe(title, description, difficulty, ingredients));
            console.log(this.recipes);
        }

    
    /**
     * returns a copy of the internal recipes array
     */
    getRecipes(){
        return this.recipes.slice();
    }


    /**
     * update recipe by index
     */
    updateRecipe(index: number,
        title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]){

        // replace old recipe at index
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }
}