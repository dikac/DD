namespace Htme.Component.Element {

    //import Attributes = Htme.Component.Element.Attributes.Attributes;

    export class Dom {

        readonly attributes : Htme.Component.Element.Attributes.Attributes;
        readonly element : JQuery;

        constructor(element : JQuery|string|null = null) {

            if(typeof element === "string") {

                element = $(element);
            }

            if(element === null) {

                element = $('<div></div>');
            }

            this.element = element;
            this.attributes = new Htme.Component.Element.Attributes.Attributes(element);
        }

        toString() : string {

            let string = this.element.wrap('<div></div>').parent().html();
            this.element.unwrap();

            return string;
        }

    }
}