namespace Htme.Component.Element {

    export interface Element {

        attributes : Attributes.Attributes;

        // detach();
        //
        // attach();

        readonly element: JQuery;

        toString(): string;
    }
}