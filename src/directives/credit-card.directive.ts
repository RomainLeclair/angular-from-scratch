import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formatter } from "../services/formatter";
import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-biding";
import { HostListener } from "../decorators/host-listener";


@Directive({
    selector: '[credit-card]'
})
export class CreditCardDirective{
    @HostBinding('style.borderColor')
    borderColor ="blue";

    constructor(public element: HTMLElement, private formatter: Formatter, private verifier: CreditCardVerifier) {
    }
    @HostListener('input', ["event.target"])
    formatCreditCardNumber(element: HTMLInputElement){
        element.value =this.formatter.formatNumber(element.value, 16, 4, true);
    }
}