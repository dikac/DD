namespace Htme.Component.Element {

    //import Attributes = Htme.Component.Map_.Attributes;

    export class Dom {

        readonly attributes : Htme.Component.Map_.Attributes;
        readonly element : JQuery;

        constructor(element : JQuery|string|null = null) {

            if(typeof element === "string") {

                element = $(element);
            }

            if(element === null) {

                element = $('<div></div>');
            }

            this.element = element;
            this.attributes = new Htme.Component.Map_.Attributes(element);
        }

        toString() : string {

            let string = this.element.wrap('<div></div>').parent().html();
            this.element.unwrap();

            return string;
        }

    }
}