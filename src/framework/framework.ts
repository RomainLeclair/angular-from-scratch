
import { ProvidersMetadata, ServiceInstances, Module } from "./type";
import set from "lodash/set";

import { Detector } from "./change-detector";
import { NgZone } from "./zone";

export class Framework {
    /** 
    * Le tableau qui recence l'ensemble des directives déclarées par mes collègues dnas le projet
    */
    directives: any[] = [];

    /**
     * le tableau qui continet les instances de services déjà construites
     */
    services: ServiceInstances = []

    /**
     * Le tableau qui contient les définitions de mes services (comment construire tel ou tel service)
     */
    providers: ProvidersMetadata = []


    /**
     * Le traitement qui va instancier les directivres greffer 
     */
    bootstrapApplication(metadata: Module) {

        this.providers = metadata.providers || [];
        this.directives = metadata.declarations;
        NgZone.run(() =>{
            this.directives.forEach(directive => {
                const elements = document.querySelectorAll<HTMLElement>(directive.selector);
                
                elements.forEach(element => {
                    const params = this.analyzeDirectiveConstructor(directive, element)
    
                    const directiveInstance = Reflect.construct(directive, params);
    
                    const proxy = new Proxy(directiveInstance, {
                        set(target, propName, value, proxy) {
    
                            target[propName] = value
    
                            if(!target.bindings){
                                return true;
                            }
    
                            const binding = target.bindings.find(b => b.propName === propName);
                            if(!binding){
                                return true;
                            }
    
                            Detector.addBinding(element, binding.attrName, value)
                            //console.log("MAJ " + propName.toString() + " avec valeur "+ value)
                            //set(target.element, binding.attrName, value);
    
                            //console.log("Prop" + propName)
                            return true;
                        },
                    });
                    proxy.init();
                })
            });
        })
        
        
    }
    /**
     * Permet d'analyser les besoins d'un constructeur et de créer les instances nécessaires (les dépendances)
     * @param directive La classe de la directive instancier
     * @param element L'element HTML sur lequel on veut greffer la directive
     * @returns Le tableau de paramètres nécessaire pout instancier ma directive
     */
    private analyzeDirectiveConstructor(directive, element: HTMLElement) {
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());
    
        if(!hasConstructor){
            return [];
        }
        const paramsNames = this.extractParamNamesFromDirective(directive);
        const params = paramsNames.map((name) => {
            if(name === "element") {
                return element;
            }
    
            const directiveProviders = directive.providers || [];
    
            const directiveProvider = directiveProviders.find(p => p.provide === name);
            if(directiveProvider) {
                const instance = directiveProvider.construct();
                return instance;
            }
    
            const service = this.services.find(s => s.name === name);
    
            if(service){
                return service.instance;
            }
    
            const provider = this.providers.find(p => p.provide === name);
    
            if(!provider) {
                throw new Error("Aucun fournisseur n'existe pour le service" + name);
            }
            const instance = provider.construct();
            this.services.push({
                name: name,
                instance: instance
            })
            return instance;
        });
        return params
    }

    /**
     * Extrait les noms des paramètres du constructeur d'une directive
     * @param directive La directive dont je veux connaitre les paramètres
     * @returns Un tableau avec les noms des paramètres du constructeur
     */
    private extractParamNamesFromDirective(directive){
        const params = /constructor\((.*)\)/g.exec(directive.toString());
        if(!params) {
            return [];
        }
    
        return params[1].split(", ");
    }
}

export const Angular = new Framework();