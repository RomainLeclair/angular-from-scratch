export type ProviderMetadata = {
    /**
     * Le nom du service que l'on cherche à fournir
     * 
     * Par exemple : "formatter"
     */
    provide: string;

    /**
     * Une fonction qui retourne unse instance du service que l'on cherche à forunir
     * 
     * Par exemple: ()=> new Formater
     */
    construct: Function;
};

export type ProvidersMetadata = ProviderMetadata[]

export type ServiceInstance = {
    /**
     * Le nom du service que l'on contient
     */
    name: string;
    /**
     * L'instance du service
     */
    instance: any;
};

export type ServiceInstances =  ServiceInstance[];

export type Module = {
    /**
     * Le tableau qui doit contenir les classes de mes directives
     */
    declarations: any[];
    /**
     * Un tableau qui contient les définitions de services pour mes driecives
     */
    providers?: ProvidersMetadata
}

export type DirectiveMetada = {
    /**
     * Le sélecteur CSS qui explique quels sont les éléments ciblés par cette directive
     */
    selector: string;
    /**
     * La liste des providers que la directive précise
     */
    providers?: ProvidersMetadata;
}

export type ComponentMetadata = {
    /**
     * Le sélecteur CSS qui explique quels sont les éléments ciblés par cette directive
     */
    selector: string;
    /**
     * La liste des providers que la directive précise
     */
    providers?: ProvidersMetadata;
    template: string;
}