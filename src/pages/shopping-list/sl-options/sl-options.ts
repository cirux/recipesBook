import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

/**
 * Page for display popover with inline template
 */
@Component({
    selector: 'page-sl-options',
    template: `
    <ion-grid text-center>
        <ion-row>
            <ion-col>
                <h3>Store & Load</h3>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <button ion-button outline (click)="onAction('load')" >Load List</button>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
            <button ion-button outline (click)="onAction('save')" >Save List</button>
            </ion-col>
        </ion-row>

    `
})
export class SlOptionsPage{

    constructor(private viewCtrl: ViewController){}

    onAction(action: string){
        console.log("onAction " + action);
        this.viewCtrl.dismiss({action: action});
    }

}