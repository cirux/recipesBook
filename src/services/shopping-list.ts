import { Ingredient } from "../model/ingredient";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

/**
 * Service
 */
@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [];
    private dbURL = 'https://ionic-ciro-recipe-book.firebaseio.com/';

    constructor(private http: Http,
        private authService: AuthService) { }

    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);    // push all elements in array
    }

    getItems() {
        return this.ingredients.slice();    // copy the array
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }

    /**
     * Returnsa an observable (you need to subscribe to it)
     * @param token 
     */
    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        console.log("uid " + userId);
        // The PUT method should only be used if we want to fully replace the value of a resource
        // calls to the HTTP module will all return an observable, that we need to subscribe to
        // adding also authentication query (?auth=token)
        return this.http.put(this.dbURL + userId + '/shopping-list.json?auth=' + token,
            this.ingredients)
            .map((response: Response) => {
                // extracts response body
                return response.json;
            });
    }

    /**
     * Returnsa an observable (you need to subscribe to it)
     * @param token 
     */
    fetchList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get(this.dbURL + userId + '/shopping-list.json?auth=' + token)
            .pipe(
                map(data => {
                    return data
                })
            )
    }


}