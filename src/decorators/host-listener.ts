
/**
 * Permet de lier une méthode de la directive à un év_nement qui aura lieu sur l'élément HTML
 * 
 * @param eventName L'évènement auquel on shouaire réagir et lier la méthode 
 * @param params un tableau des paramètres dont on a besoin
 * exemple :
 * @HostListener('click', ['evenet.target'])
 * onClick(target)
 * @returns 
 */
export function HostListener(eventName: string, params: (string|number)[] = []) {
    return function(decoratedClass, methodName: string){
        const originalInitFunction: Function = decoratedClass["init"] || function () {};
        decoratedClass["init"] = function () {
            originalInitFunction.call(this);

            this.element.addEventListener(eventName, (event) => {
                const paramsToSend = params.map(param => eval(param.toString()));

                this[methodName](... paramsToSend)
            })
        }
    }
}