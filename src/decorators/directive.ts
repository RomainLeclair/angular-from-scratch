import { DirectiveMetada } from "../framework/type"

export function Directive(metadata: DirectiveMetada) {
    return function (decoratedClass) {
        decoratedClass["selector"] = metadata.selector;
        decoratedClass["providers"] = metadata.providers || [];
        
    }
}
