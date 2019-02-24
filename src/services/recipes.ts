import { Recipe } from "../model/recipe";
import { Ingredient } from "../model/ingredient";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth";
import 'rxjs/Rx';

/**
 * Recipes service: this service is added into the providers array in app.module.ts
 */
@Injectable()
export class RecipesService {
    private recipes: Recipe[] = [];
    private dbURL = 'https://ionic-ciro-recipe-book.firebaseio.com/';

    constructor(private http: Http,
        private authService: AuthService){}

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
    getRecipes() {
        return this.recipes.slice();
    }


    /**
     * update recipe by index
     */
    updateRecipe(index: number,
        title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]) {

        // replace old recipe at index
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put(this.dbURL + userId + '/recipes.json?auth=' + token,
            this.recipes)
            .map((response: Response) => response.json());
    }

    fetchList(token: string){
        const userId = this.authService.getActiveUser().uid;
        return this.http.get(this.dbURL + userId + '/recipes.json?auth=' + token)
        .map((response: Response) => {
            // fix missing ingredients management
            const recipes: Recipe[] = response.json() ? response.json() : [];
            for(let item of recipes){
                if(!item.hasOwnProperty('ingredients')){
                    item.ingredients = [];
                }
            }

            return recipes;
        })
        .do((recipes: Recipe[]) => {
            if(recipes){
                this.recipes = recipes;
            } else{
                this.recipes = [];
            }
        });
    }
}