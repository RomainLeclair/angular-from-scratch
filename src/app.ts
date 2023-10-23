
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { CreditCardDirective } from "./directives/credit-card.directive";
import { Formatter } from "./services/formatter";
import { CreditCardVerifier } from "./services/credit-card-verifier";
import { Angular } from "./framework/framework";
import { ProvidersMetadata } from "./framework/type";
import { NgZone } from "./framework/zone";
import { ChronoDirective } from "./directives/chrono.directive";
import { UserProfileComponent } from "./directives/user-profile.component";
import { CounterComponent } from "./directives/counter.component";
// Framework



Angular.bootstrapApplication({
    declarations: [PhoneNumberDirective, CreditCardDirective, ChronoDirective, UserProfileComponent, CounterComponent],
    providers: [
        {
            provide : "formatter",
            construct: () => new Formatter("global")
        },
        {
            provide : "verifier",
            construct: () => new CreditCardVerifier()
        }
    ]
})



