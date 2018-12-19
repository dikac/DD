namespace Htme.Component.Element {



    export interface Element {

        attributes(): Attributes;

        // parent();
        detach();

        //parent(jquery : JQuery|null);
        attach();

        //content : Content ;
        readonly element: JQuery;

        toString(): string;
    }
}