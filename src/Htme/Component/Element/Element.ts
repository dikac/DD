namespace Htme.Component.Element {

    export interface Element {

        attributes : Attributes.Attributes;

        readonly element: JQuery;

        toString(): string;



    }
}