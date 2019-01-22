import { Ingredient } from "./ingredient";

export class Recipe {

    /**
     * The constructor automatically assigns parameters to properties
     * @param title 
     * @param description 
     * @param difficulty 
     * @param ingredients 
     */
    constructor(
        public title: string,
        public description: string,
        public difficulty: string,
        public ingredients: Ingredient[]
    ) {

    }
}