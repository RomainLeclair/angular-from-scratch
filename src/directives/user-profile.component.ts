import { Directive } from "../decorators/directive";
import { Input } from "../decorators/input";
import { Component } from "../decorators/component"

@Component({
    selector: "user-profile",
    template: `
        <h3 (click)="onClickH3">{{ firstName }} {{ lastName }}</h3>
        <strong>Poste: </strong> {{ job }}
        <button (click)="onClickButton" (dblclick)="onDblClickButton">Changer le prénom</button>`,
})
export class UserProfileComponent {
    @Input('first-name')
    firstName: string;

    @Input('last-name')
    lastName: string;

    @Input('job')
    job: string;


    onDblClickButton(){
        console.log("Double click")
    }
    onClickH3(){
        console.log("click sur le h3")
    }

    onClickButton() {
        this.firstName = "Roger";
        
    }
    constructor(public element: HTMLElement) {}

}