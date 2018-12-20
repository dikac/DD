namespace Htme.Component.Element {

    export interface Element {

        attributes(): Attributes;

        detach();

        attach();

        readonly element: JQuery;

        toString(): string;
    }
}