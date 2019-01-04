namespace Htme.Component.Element {

    import Attributes = Htme.Component.Map_.Attributes;

    export interface Element {

        attributes : Attributes;

        readonly element: JQuery;

        toString(): string;



    }
}